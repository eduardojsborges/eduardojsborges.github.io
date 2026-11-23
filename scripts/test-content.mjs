import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const sample = 'src/content/publications/2099-content-check.md';
const secondSample = 'src/content/publications/2099-second-flagship-check.md';
const astro = 'node_modules/astro/astro.js';
function build() { return spawnSync(process.execPath,[astro,'build'], {encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}}); }
async function html(file) { return fs.readFile(`dist/${file}`,'utf8'); }
// Do not overwrite an author's content if a fixture name already exists.
for (const file of [sample, secondSample]) {
  try { await fs.access(file); throw new Error(`Test fixture already exists: ${file}`); }
  catch(error) { if (error.code !== 'ENOENT') throw error; }
}
const fixture = '---\ntitle: "Content workflow verification"\nauthors: ["Test Author"]\ndate: 2099-01-01\nvenue: "Workflow verification"\nsummary: "Temporary test entry."\nfeatured: true\ncitation: "A supplied plain-text citation."\nbibtex: |\n  @misc{workflow2099,\n    title = {Content workflow verification},\n    year = {2099}\n  }\n---\nTest abstract with a [linked project](https://example.com/research).\n\nCode: https://github.com/eduardojsborges/KITTI-ReID.\n\n[Local projects](/projects/)\n';
try {
  await fs.writeFile(sample, fixture);
  const result = build();
  assert.equal(result.status,0,result.stderr+result.stdout);
  for(const page of ['index.html','publications/index.html','publications/2099-content-check/index.html']) assert.match(await html(page),/Content workflow verification/);
  const homepage = await html('index.html');
  assert.doesNotMatch(homepage, /SCROLL TO EXPLORE|PROJECT \/ 01|A little clarity|--spot-x/);
  for (const page of ['publications/index.html', 'publications/2099-content-check/index.html']) {
    const output = await html(page);
    assert.match(output, /href="https:\/\/example.com\/research"/);
    assert.match(output, /href="https:\/\/github.com\/eduardojsborges\/KITTI-ReID"/);
    assert.match(output, /href="\/research-portfolio\/projects\/"/);
    assert.match(output, /A supplied plain-text citation\./);
    assert.match(output, /@misc\{workflow2099,\n  title = /);
    assert.match(output, /role="tablist"/);
    assert.doesNotMatch(output, /href="[^"]*\.bib"|Download BibTeX/);
  }
  // Two controlled fixtures make this independent of the author's current flagship choice.
  await fs.writeFile(sample, fixture.replace('featured: true', 'featured: true\nflagship: true'));
  await fs.writeFile(secondSample, fixture.replace('Content workflow verification', 'Second flagship verification').replace('featured: true', 'featured: false\nflagship: true'));
  const duplicate = build();
  assert.notEqual(duplicate.status, 0, 'Multiple flagship papers must fail the build.');
  assert.match(duplicate.stdout + duplicate.stderr, /Only one publication may have flagship/);
  await fs.rm(secondSample);
  await fs.writeFile(sample,'---\ntitle: "Invalid entry"\n---\n');
  const invalid = build();
  assert.notEqual(invalid.status,0,'Invalid required metadata must fail the build.');
  assert.match(invalid.stdout+invalid.stderr,/2099-content-check/);
  console.log('Passed: Markdown publishing, clickable abstract links, citation panels/newlines, no BibTeX downloads, duplicate flagship and metadata guards.');
} finally {
  await fs.rm(sample,{force:true});
  await fs.rm(secondSample,{force:true});
  const clean = build();
  if(clean.status !== 0) { console.error(clean.stdout+clean.stderr); process.exitCode = 1; }
}
