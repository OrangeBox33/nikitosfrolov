import { marked } from 'marked';

export type Text = { id: string; icon: string; title: string; html: string };

// Каждый текст — файл в ./texts с frontmatter title и необязательным icon.
// Порядок на сайте задаёт префикс имени: 01-…, 02-…
const files = import.meta.glob<string>('./texts/*.md', { query: '?raw', import: 'default', eager: true });

function parse(path: string, raw: string): Text {
	const id = path.replace(/^.*\/(\d+-)?/, '').replace(/\.md$/, '');
	const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
	const meta = Object.fromEntries(
		(m?.[1] ?? '').split('\n').map((l) => {
			const i = l.indexOf(':');
			return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
		}),
	);
	const body = m ? raw.slice(m[0].length) : raw;
	return { id, icon: meta.icon || '✍️', title: meta.title ?? id, html: marked.parse(body, { async: false }) };
}

export const texts: Text[] = Object.keys(files)
	.sort()
	.map((path) => parse(path, files[path]));
