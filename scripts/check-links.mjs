import fs from 'node:fs/promises';
import path from 'node:path';
const base = '/research-portfolio/';
const root = path.resolve('dist');
async function walk(dir) { const entries = await fs.readdir(dir, {withFileTypes:true}); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)))).flat(); }
const files = await walk(root);
let checked = 0;
const failures = [];
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await fs.readFile(file,'utf8');
  const current = new URL(base + path.relative(root,file).replaceAll('\\','/').replace(/index\.html$/, ''), 'https://eduardojsborges.github.io');
  for (const match of html.matchAll(/\b(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const raw = match[1].replaceAll('&amp;','&');
    if (/^(?:https?:|mailto:|tel:|data:)/.test(raw)) continue;
    const target = new URL(raw,current);
    if (!target.pathname.startsWith(base)) { failures.push(`${path.relative(root,file)}: outside base path: ${raw}`); continue; }
    const local = path.join(root,decodeURIComponent(target.pathname.slice(base.length)));
    try { const stat = await fs.stat(local); if(stat.isDirectory()) await fs.access(path.join(local,'index.html')); checked++; } catch { failures.push(`${path.relative(root,file)}: missing ${raw}`); }
  }
}
if(failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Validated ${checked} internal links and assets across ${files.filter(f=>f.endsWith('.html')).length} pages.`);
