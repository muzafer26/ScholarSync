const fs = require('fs');
const path = require('path');

const scaleMap = {
  'text-\\[10px\\]': 'text-[12px]',
  'text-\\[11px\\]': 'text-[13px]',
  'text-\\[12px\\]': 'text-[14px]',
  'text-\\[13px\\]': 'text-[15px]',
  'text-\\[14px\\]': 'text-[16px]',
  'text-\\[15px\\]': 'text-[17px]',
  'text-\\[16px\\]': 'text-[18px]',
  'text-\\[18px\\]': 'text-[20px]',
  'text-\\[19px\\]': 'text-[21px]',
  'text-\\[23px\\]': 'text-[25px]',
  'text-\\[27px\\]': 'text-[30px]',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, value] of Object.entries(scaleMap)) {
        const regex = new RegExp(key, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('./src');
