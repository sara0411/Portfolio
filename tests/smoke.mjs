import assert from 'node:assert/strict';

// Run against a local production server: npm run build && npm start
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200, 'Home page returns HTTP 200');
const html = await response.text();
assert.match(html, /Sara Ferraa/, 'Identity is in server-rendered HTML');
assert.match(html, /Software Engineer/, 'Primary role is present');
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'Exactly one main heading');
for (const section of ['hero', 'projects', 'about', 'skills', 'experience', 'contact']) {
  assert.ok(html.includes('id="' + section + '"'), 'Section exists: ' + section);
  assert.ok(html.includes('href="#' + section + '"'), 'Native anchor exists: ' + section);
}
assert.equal((html.match(/class="project-row"/g) || []).length, 6, 'Six project entries');
assert.equal((html.match(/class="scene iso-scene"/g) || []).length, 6, 'Every project has an isometric scene');
assert.ok(html.includes('application/ld+json'), 'Person structured data is present');
assert.ok(html.includes('og:image'), 'Link preview image is declared');
assert.ok(!html.includes('<details class="project-details"'), 'Project content is visible without disclosure widgets');
assert.ok(html.includes('portfolio-theme'), 'System-aware theme initialization is present');
assert.ok(html.includes('/sara-ferraa.jpg'), 'Real portrait is present');
assert.ok(!html.toLowerCase().includes('whoami'), 'No terminal command flourish');
assert.ok(html.includes('href="mailto:ferraasara1@gmail.com"'), 'Direct email contact');
assert.ok(html.includes('open to remote work and relocation'), 'Availability is explicit');
assert.ok(html.includes('https://ferraasara.vercel.app'), 'Correct canonical domain');
assert.ok(!html.includes('href="https://github.com/sara0411/Portfolio"'), 'No misleading project source links');
assert.ok(!html.includes('<form'), 'Contact does not pretend to submit messages');
for (const id of ['pagemate', 'education', 'community']) {
  assert.ok(html.includes('id="' + id + '"'), 'Hero click target exists: ' + id);
}
assert.ok(html.includes('/sara-ferraa-cv.pdf'), 'CV download is linked');
const cv = await fetch(base + '/sara-ferraa-cv.pdf');
assert.equal(cv.status, 200, 'CV is served');
assert.ok(!html.includes('762432566'), 'No phone number on the page');
const icon = await fetch(base + '/icon.svg');
assert.equal(icon.status, 200, 'Custom site icon is served');
console.log('PASS: server-rendered content, section anchors, editorial projects, theme setup, portrait, job-search positioning, contact, metadata, and icon.');
