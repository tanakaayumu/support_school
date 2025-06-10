/** @jest-environment node */
const fs = require('fs');
const glob = require('glob');

describe('HTML files', () => {
  const files = glob.sync('*.html');
  files.forEach(file => {
    test(`${file} has no inline style tags`, () => {
      const content = fs.readFileSync(file, 'utf8');
      expect(content.includes('<style')).toBe(false);
    });
  });
});
