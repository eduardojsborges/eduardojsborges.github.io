import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDirectory = fileURLToPath(new URL('../../public/', import.meta.url));
const legacyFiles = new Map();

/** Split fields at top-level commas, preserving nested braces and quoted values. */
export function parseBibtex(source) {
  const text = source.trim();
  const header = text.match(/^@([a-z]+)\s*([({])\s*([^,]+),/i);
  if (!header) throw new Error('Expected a BibTeX entry starting with @type{key,');
  const closing = header[2] === '(' ? ')' : '}';
  if (!text.endsWith(closing)) throw new Error('The BibTeX entry is missing its closing bracket.');
  const body = text.slice(header[0].length, -1);
  const pieces = [];
  let depth = 0, quoted = false, escaped = false, start = 0;
  for (let index = 0; index < body.length; index++) {
    const char = body[index];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '"' && depth === 0) quoted = !quoted;
    if (!quoted && char === '{') depth++;
    if (!quoted && char === '}') depth--;
    if (depth < 0) throw new Error('Unbalanced braces in BibTeX.');
    if (char === ',' && depth === 0 && !quoted) { pieces.push(body.slice(start, index)); start = index + 1; }
  }
  if (depth || quoted) throw new Error('Unbalanced braces or quotes in BibTeX.');
  pieces.push(body.slice(start));
  const fields = pieces.filter(piece => piece.trim()).map(piece => {
    const field = piece.trim().match(/^([a-z][\w-]*)\s*=\s*([\s\S]+)$/i);
    if (!field) throw new Error(`Invalid BibTeX field: ${piece.trim().slice(0, 60)}`);
    return { name: field[1], value: field[2].trim() };
  });
  return { type: header[1], key: header[3].trim(), fields };
}

export function formatBibtex(source) {
  const entry = parseBibtex(source);
  return `@${entry.type}{${entry.key},\n${entry.fields.map(field => `  ${field.name} = ${field.value.replace(/\r\n/g, '\n')},`).join('\n')}\n}`;
}

function fieldText(entry, name) {
  const value = entry?.fields.find(field => field.name.toLowerCase() === name)?.value;
  return value?.replace(/^[{"]([\s\S]*)[}"]$/, '$1').trim();
}

function legacyBibtex(localPath) {
  if (!localPath?.startsWith('/files/')) return '';
  const target = path.resolve(publicDirectory, `.${localPath}`);
  if (!target.startsWith(`${path.resolve(publicDirectory)}${path.sep}`)) throw new Error('BibTeX file must be inside public/files.');
  if (!legacyFiles.has(target)) legacyFiles.set(target, readFileSync(target, 'utf8'));
  return legacyFiles.get(target);
}

function doiFromUrl(url) {
  if (!url) return '';
  try { const parsed = new URL(url); return /^(dx\.)?doi\.org$/.test(parsed.hostname) ? decodeURIComponent(parsed.pathname.slice(1)) : ''; }
  catch { return ''; }
}

/** Create both formats from supplied citations, or actual metadata when absent. */
export function publicationCitations(entry) {
  const p = entry.data;
  const legacyCitation = (p.citation ?? '').trim();
  const rawBibtex = p.bibtex?.trim() || (/^@/.test(legacyCitation) ? legacyCitation : '') || legacyBibtex(p.bibtexUrl);
  let parsed;
  if (rawBibtex) {
    try { parsed = parseBibtex(rawBibtex); }
    catch (error) { throw new Error(`Publication ${entry.id}: ${error.message}`); }
  }
  const year = p.date.getUTCFullYear();
  const doi = fieldText(parsed, 'doi') || doiFromUrl(p.paperUrl);
  const pages = fieldText(parsed, 'pages');
  const authors = p.authors.length > 1 ? `${p.authors.slice(0, -1).join(', ')} and ${p.authors.at(-1)}` : p.authors[0];
  const generatedPlain = `${authors}, "${p.title}," in ${p.venue}, ${year}${pages ? `, pp. ${pages.replace(/--/g, '–')}` : ''}${doi ? `, doi: ${doi}` : ''}.`;
  const plain = legacyCitation && !/^@/.test(legacyCitation) ? legacyCitation : generatedPlain;
  if (rawBibtex) return { plain, bibtex: formatBibtex(rawBibtex), generatedBibtex: false };

  // Fallbacks use only known metadata; never invent pages, editors, or publishers.
  const conference = /conference|symposium|workshop|proceedings/i.test(p.venue);
  const protect = value => value.replace(/[{}]/g, char => `\\${char}`);
  const fields = [
    ['author', p.authors.join(' and ')], ['title', p.title],
    [conference ? 'booktitle' : 'howpublished', p.venue], ['year', String(year)],
    ...(doi ? [['doi', doi]] : []), ...(p.paperUrl ? [['url', p.paperUrl]] : []),
  ];
  const key = `${entry.id.replace(/[^a-z\d_-]/gi, '')}${year}`;
  const generated = `@${conference ? 'inproceedings' : 'misc'}{${key},\n${fields.map(([name, value]) => `  ${name} = {${protect(value)}},`).join('\n')}\n}`;
  return { plain, bibtex: generated, generatedBibtex: true };
}
