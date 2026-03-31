import React, { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform sampler2D uGradient;

  // Bayer 4x4 Matrix
  float bayer4x4(vec2 p) {
    vec2 pos = mod(p, 4.0);
    int x = int(pos.x);
    int y = int(pos.y);
    if (y == 0) {
      if (x == 0) return 0.0;
      if (x == 1) return 8.0;
      if (x == 2) return 2.0;
      if (x == 3) return 10.0;
    } else if (y == 1) {
      if (x == 0) return 12.0;
      if (x == 1) return 4.0;
      if (x == 2) return 14.0;
      if (x == 3) return 6.0;
    } else if (y == 2) {
      if (x == 0) return 3.0;
      if (x == 1) return 11.0;
      if (x == 2) return 1.0;
      if (x == 3) return 9.0;
    } else if (y == 3) {
      if (x == 0) return 15.0;
      if (x == 1) return 7.0;
      if (x == 2) return 13.0;
      if (x == 3) return 5.0;
    }
    return 0.0;
  }

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= aspect;

    // Sinusoidal warping (localWarp)
    float warp = sin(p.x * 2.0 + uTime * 0.5) * 0.5 + sin(p.y * 3.0 - uTime * 0.3) * 0.3;
    vec2 warpedP = p + vec2(warp * 0.2);

    // Modulated wave logic
    float wave = sin(warpedP.x * 4.0 + uTime * 0.8) * cos(warpedP.y * 3.0 - uTime * 0.4);
    wave += sin(length(warpedP) * 5.0 - uTime * 1.2) * 0.5;
    
    // Intensity calculation
    float intensity = (wave * 0.5 + 0.5);
    
    // Apply Bayer Dithering
    float dither = bayer4x4(gl_FragCoord.xy) / 16.0;
    intensity = floor(intensity * 16.0 + dither) / 16.0;

    // Sample Gradient
    vec3 color = texture2D(uGradient, vec2(intensity, 0.5)).rgb;

    // Subtle Grain
    float grain = (random(uv + uTime * 0.01) - 0.5) * 0.05;
    color += grain;

    // Vignette
    float dist = length(uv - 0.5);
    float vignette = smoothstep(0.8, 0.4, dist);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface WebGLBackgroundProps {
  mobileOptimized?: boolean;
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ mobileOptimized = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) {
      setIsSafari(true);
    }
  }, []);

  useEffect(() => {
    if (isSafari || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Shader compilation helpers
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full screen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resLoc = gl.getUniformLocation(program, "uResolution");
    const gradLoc = gl.getUniformLocation(program, "uGradient");

    // Create 1D Gradient Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    const gradientData = new Uint8Array(256 * 4);
    const stops = [
      { pos: 0, color: [10, 10, 10] },        // #0a0a0a
      { pos: 0.2, color: [74, 26, 5] },    // Deep Rust
      { pos: 0.45, color: [224, 122, 62] }, // Vibrant Orange (#E07A3E)
      { pos: 0.7, color: [245, 209, 176] }, // Soft Gold/Cream
      { pos: 0.9, color: [26, 10, 5] },    // Dark Brown
      { pos: 1.0, color: [10, 10, 10] }       // #0a0a0a
    ];

    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let c = [0, 0, 0];
      for (let j = 0; j < stops.length - 1; j++) {
        if (t >= stops[j].pos && t <= stops[j + 1].pos) {
          const localT = (t - stops[j].pos) / (stops[j + 1].pos - stops[j].pos);
          c = stops[j].color.map((start, idx) => 
            Math.round(start + (stops[j + 1].color[idx] - start) * localT)
          );
          break;
        }
      }
      gradientData[i * 4] = c[0];
      gradientData[i * 4 + 1] = c[1];
      gradientData[i * 4 + 2] = c[2];
      gradientData[i * 4 + 3] = 255;
    }

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, gradientData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let animationFrameId: number;
    let startTime = Date.now();
    let lastTime = 0;
    const targetFPS = mobileOptimized ? 28 : 60;
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      const dpr = mobileOptimized ? 0.6 : Math.min(window.devicePixelRatio || 1, 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const deltaTime = time - lastTime;
      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = time - (deltaTime % frameInterval);

      const elapsed = (Date.now() - startTime) / 1000;
      
      gl.clearColor(0.039, 0.039, 0.039, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1i(gradLoc, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
    };
  }, [isSafari, mobileOptimized]);

  if (isSafari) {
    return (
      <div 
        className="fixed inset-0 -z-1 bg-[radial-gradient(circle_at_top,#6d2a10_0%,#130b08_38%,#050505_78%)]"
        style={{ pointerEvents: "none" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-1 w-full h-full bg-black"
      style={{ 
        imageRendering: "pixelated",
        pointerEvents: "none"
      }}
    />
  );
};

export default WebGLBackground;
