const fs = require('fs');
const glob = require('glob');

const htmlFiles = glob.sync('*.html');
const styleCssPath = 'style.css';
let styleCssContent = fs.existsSync(styleCssPath) ? fs.readFileSync(styleCssPath,'utf8') : '';
const cssLines = new Set(styleCssContent.split(/\r?\n/).map(l => l.trim()));
let aggregated = '';
const styleBlockPattern = /<style[^>]*>([\s\S]*?)<\/style>/gi;

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file,'utf8');
  let changed = false;
  let matches = [...html.matchAll(styleBlockPattern)];
  if(matches.length){
    let fileLines = [];
    matches.forEach(m => {
      let css = m[1];
      css.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if(trimmed && !cssLines.has(trimmed)){
          cssLines.add(trimmed);
          fileLines.push(line);
        }
      });
    });
    if(fileLines.length){
      aggregated += `\n/* from ${file} */\n` + fileLines.join('\n') + '\n';
    }
    html = html.replace(styleBlockPattern,'');
    changed = true;
  }
  if(changed){
    fs.writeFileSync(file, html, 'utf8');
  }
});

if(aggregated){
  fs.writeFileSync(styleCssPath, styleCssContent + '\n' + aggregated, 'utf8');
}
