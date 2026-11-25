import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const formerBase = 'research-portfolio';
const oldPages = {
  'cv': '/files/Eduardo_Borges_CV.pdf',
  'publication/2024-11-a-modular-multimodal-multi-object-tracking-by-detection-approach-with-applications-in-outdoor-and-indoor-environments': '/publications/multimodal-object-tracking/',
  'publication/2025-05-27-Safer-and-Trustworthier-Navigation-of-Automated-Vehicles': '/publications/safer-navigation/',
  'publication/2025-11-DepthTriFusion-A-Three-Stream-RGB-LiDAR-Normal-Pipeline-for-Depth-Estimation': '/publications/depthtrifusion/',
  'publication/2025-11-12-The-Impact-of-Loss-Functions-and-Architectures-in-Object-Re-Identification-A-Comparative-Study': '/publications/object-reidentification/',
};

async function redirect(from, to) {
  const directory = path.join(dist, from);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), `<!doctype html>
<html lang="en"><meta charset="utf-8">
<title>Page moved · Eduardo Borges</title>
<link rel="canonical" href="${new URL(to, 'https://eduardojsborges.github.io')}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0;url=${to}">
<p>This page has moved. <a href="${to}">Continue to the new address</a>.</p></html>
`, { flag: 'wx' });
}

// Build aliases from the generated routes so old portfolio URLs lead to the same pages.
const files = await readdir(dist, { recursive: true, withFileTypes: true });
for (const file of files) {
  if (!file.isFile() || file.name !== 'index.html') continue;
  const route = path.relative(dist, file.parentPath).split(path.sep).map(encodeURIComponent).join('/');
  await redirect(path.join(formerBase, path.relative(dist, file.parentPath)), route ? `/${route}/` : '/');
}
for (const [from, to] of Object.entries(oldPages)) await redirect(from, to);

// Direct links to public PDFs, images and the favicon also remain usable.
for (const asset of ['files', 'images', 'favicon.svg']) {
  await cp(path.join(dist, asset), path.join(dist, formerBase, asset), { recursive: true });
}
