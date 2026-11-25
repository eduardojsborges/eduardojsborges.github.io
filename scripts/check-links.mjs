import fs from 'node:fs/promises';
import path from 'node:path';
const site = 'https://eduardojsborges.github.io';
const root = path.resolve('dist');
async function walk(dir) { const entries = await fs.readdir(dir, {withFileTypes:true}); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)))).flat(); }
const files = await walk(root);
let checked = 0;
const failures = [];
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await fs.readFile(file,'utf8');
  const current = new URL('/' + path.relative(root,file).replaceAll('\\','/').replace(/index\.html$/, ''), site);
  for (const match of html.matchAll(/\b(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const raw = match[1].replaceAll('&amp;','&');
    const target = new URL(raw,current);
    if (target.origin !== site) continue;
    const local = path.join(root,decodeURIComponent(target.pathname.slice(1)));
    try { const stat = await fs.stat(local); if(stat.isDirectory()) await fs.access(path.join(local,'index.html')); checked++; } catch { failures.push(`${path.relative(root,file)}: missing ${raw}`); }
  }
}
if(failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Validated ${checked} internal links and assets across ${files.filter(f=>f.endsWith('.html')).length} pages.`);
