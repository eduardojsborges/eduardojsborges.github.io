import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBibtex, parseBibtex, publicationCitations } from '../src/lib/citations.mjs';

const entry = overrides => ({ id: 'test-paper', data: { title: 'A known paper', authors: ['E. Borges', 'A. Researcher'], date: new Date('2026-01-01'), venue: 'Research Conference', paperUrl: 'https://doi.org/10.1234/example', ...overrides } });
const supplied = '@INPROCEEDINGS{paper2026, author={Borges, Eduardo and Researcher, A.}, title={{RGB, LiDAR} fusion}, booktitle={Research Conference}, year={2026}, pages={12--18}, doi={10.1234/example}}';

test('folded YAML BibTeX is restored to indented field-per-line text', () => {
  const pretty = formatBibtex(supplied);
  assert.match(pretty, /^@INPROCEEDINGS\{paper2026,\n  author = /);
  assert.match(pretty, /\n  title = \{\{RGB, LiDAR\} fusion\},\n/);
  assert.deepEqual(parseBibtex(pretty), parseBibtex(supplied));
});

test('commas inside braces, quotes, and escaped braces are not field separators', () => {
  const input = '@misc(key, title="A title, with commas", note={Nested {value, test} and \\{literal\\}}, year=2026)';
  assert.equal(parseBibtex(input).fields.length, 3);
  assert.deepEqual(parseBibtex(formatBibtex(input)).fields, parseBibtex(input).fields);
});

test('legacy BibTeX in citation yields separate plain text with known pages and DOI', () => {
  const output = publicationCitations(entry({ citation: supplied }));
  assert.doesNotMatch(output.plain, /^@/);
  assert.match(output.plain, /pp\. 12–18, doi: 10\.1234\/example/);
  assert.equal(output.generatedBibtex, false);
});

test('explicit plain text and literal multiline BibTeX take precedence', () => {
  const output = publicationCitations(entry({ citation: 'An exact supplied plain-text citation.', bibtex: formatBibtex(supplied), bibtexUrl: '/files/unused.bib' }));
  assert.equal(output.plain, 'An exact supplied plain-text citation.');
  assert.equal(output.bibtex, formatBibtex(supplied));
});

test('legacy local BibTeX files are embedded rather than offered as downloads', () => {
  const output = publicationCitations(entry({ bibtexUrl: '/files/paper_cscs_2025.bib' }));
  assert.match(output.bibtex, /\n  pages = \{183-189\}/);
  assert.match(output.bibtex, /10\.1109\/CSCS66924\.2025\.00035/);
  assert.equal(output.generatedBibtex, false);
});

test('missing citation data generates both formats without inventing metadata', () => {
  const output = publicationCitations(entry({}));
  assert.match(output.plain, /E\. Borges and A\. Researcher/);
  assert.match(output.bibtex, /@inproceedings/);
  assert.match(output.bibtex, /doi = \{10\.1234\/example\}/);
  assert.doesNotMatch(output.bibtex, /pages\s*=|publisher\s*=|volume\s*=/);
  assert.equal(output.generatedBibtex, true);
});

test('malformed supplied BibTeX identifies the publication instead of losing data', () => {
  assert.throws(() => publicationCitations(entry({ bibtex: '@article{broken, title={Unclosed}' })), /Publication test-paper/);
});
