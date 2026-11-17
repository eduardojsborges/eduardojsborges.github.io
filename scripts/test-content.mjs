import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const sample = 'src/content/publications/2099-content-check.md';
const astro = 'node_modules/astro/astro.js';
function build() { return spawnSync(process.execPath,[astro,'build'], {encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}}); }
async function html(file) { return fs.readFile(`dist/${file}`,'utf8'); }
try {
  await fs.writeFile(sample, '---\ntitle: "Content workflow verification"\nauthors: ["Test Author"]\ndate: 2099-01-01\nvenue: "Workflow verification"\nsummary: "Temporary test entry."\nfeatured: true\n---\nTest abstract.\n');
  const result = build();
  assert.equal(result.status,0,result.stderr+result.stdout);
  for(const page of ['index.html','publications/index.html','publications/2099-content-check/index.html']) assert.match(await html(page),/Content workflow verification/);
  await fs.writeFile(sample,'---\ntitle: "Invalid entry"\n---\n');
  const invalid = build();
  assert.notEqual(invalid.status,0,'Invalid required metadata must fail the build.');
  assert.match(invalid.stdout+invalid.stderr,/2099-content-check/);
  console.log('Passed: Markdown automatically creates detail/list/featured entries; invalid metadata identifies the file and blocks publication.');
} finally {
  await fs.rm(sample,{force:true});
  const clean = build();
  if(clean.status !== 0) { console.error(clean.stdout+clean.stderr); process.exitCode = 1; }
}
