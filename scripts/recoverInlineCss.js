const fs = require('fs');
const {execSync} = require('child_process');

const commit = process.argv[2] || 'HEAD^';
const stylePath = 'style.css';
const existingCss = fs.existsSync(stylePath) ? fs.readFileSync(stylePath,'utf8') : '';
const blocksSet = new Set();
let aggregated = '';

const htmlFiles = execSync(`git ls-tree -r --name-only ${commit}`, {encoding:'utf8'})
  .trim().split('\n').filter(f => f.endsWith('.html'));

const styleBlockPattern = /<style[^>]*>([\s\S]*?)<\/style>/gi;

htmlFiles.forEach(file => {
  const content = execSync(`git show ${commit}:${file}`, {encoding:'utf8'});
  let match;
  while((match = styleBlockPattern.exec(content)) !== null){
    const block = match[1].trim();
    if(block && !existingCss.includes(block) && !blocksSet.has(block)){
      blocksSet.add(block);
      aggregated += `\n/* recovered from ${file}@${commit} */\n` + block + '\n';
    }
  }
});

if(aggregated){
  fs.appendFileSync(stylePath, aggregated);
}
