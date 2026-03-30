const fs = require('fs');

try {
  const filePath = 'Dark Profile Card Float.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  function replaceText(obj) {
    if (typeof obj === 'string') {
      if (obj === 'Tom') return 'Akshat';
      if (obj === 'TOM') return 'AKSHAT';
      if (obj === 'tom') return 'akshat';
      return obj;
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = replaceText(obj[i]);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        // Lottie text layers usually have text in `t.d.k[0].s.t`
        // We'll just recursively replace all string values that match exactly.
        obj[key] = replaceText(obj[key]);
      }
    }
    return obj;
  }

  replaceText(data);
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('Successfully updated Lottie JSON');
} catch (e) {
  console.error('Error updating Lottie JSON:', e);
}
