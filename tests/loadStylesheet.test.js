/** @jest-environment node */
const fs = require('fs');
const glob = require('glob');

describe('HTML files link to style.css', () => {
  const files = glob.sync('*.html');
  files.forEach(file => {
    test(`${file} links to style.css`, () => {
      const content = fs.readFileSync(file, 'utf8');
      expect(/<link[^>]+href="style\.css"/i.test(content)).toBe(true);
    });
  });
});
