import { useEffect, useState } from 'react';
import { Site } from '../Site';
import { defaultTheme, PALETTES, type Theme } from '../theme';
import { GROUPS, type Control } from './controls';
import './sandbox.css';

const STORAGE_KEY = 'nikitosfrolov-sandbox-3';

// Из сохранённого берём только то, что ещё есть в теме: после переименований
// старые ключи и варианты списков молча откатываются к defaultTheme
function load(): Theme {
	const theme = { ...defaultTheme };
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? {};
		for (const c of GROUPS.flatMap((g) => g.controls)) {
			const v = saved[c.key];
			if (typeof v !== typeof defaultTheme[c.key]) continue;
			if (c.type === 'select' && !c.options.some(([o]) => o === v)) continue;
			Object.assign(theme, { [c.key]: v });
		}
	} catch {}
	return theme;
}

export function Sandbox() {
	const [theme, setTheme] = useState<Theme>(load);
	const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
		} catch {}
	}, [theme]);

	const set = (key: keyof Theme, value: unknown) => setTheme((t) => ({ ...t, [key]: value }));

	// Отдаём только то, что отличается от defaultTheme, — это и вставляется в theme.ts
	const copy = async () => {
		const diff = Object.fromEntries(Object.entries(theme).filter(([k, v]) => defaultTheme[k as keyof Theme] !== v));
		await navigator.clipboard.writeText(JSON.stringify(diff, null, '\t'));
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="sb">
			<aside className="sb-panel">
				<div className="sb-top">
					<div className="sb-seg">
						<button className={view === 'desktop' ? 'on' : ''} onClick={() => setView('desktop')}>
							Десктоп
						</button>
						<button className={view === 'mobile' ? 'on' : ''} onClick={() => setView('mobile')}>
							Мобильный
						</button>
					</div>
				</div>

				<section className="sb-group">
					<h3>Палитры</h3>
					<div className="sb-palettes">
						{Object.entries(PALETTES).map(([name, p]) => (
							<button key={name} className="sb-palette" onClick={() => setTheme((t) => ({ ...t, ...p }))} title={name}>
								<span className="sb-swatches">
									{[p.bg, p.brown, p.accent, p.extra].map((c, i) => (
										<i key={i} style={{ background: c }} />
									))}
								</span>
								{name}
							</button>
						))}
					</div>
				</section>

				{GROUPS.map((g) => (
					<section key={g.title} className="sb-group">
						<h3>{g.title}</h3>
						{g.controls.map((c) => (
							<Field key={c.key} control={c} value={theme[c.key]} onChange={(v) => set(c.key, v)} />
						))}
					</section>
				))}

				<div className="sb-actions">
					<button className="sb-primary" onClick={copy}>
						{copied ? 'Скопировано' : 'Скопировать тему'}
					</button>
					<button onClick={() => setTheme(defaultTheme)}>Сбросить</button>
				</div>
			</aside>

			<main className={`sb-stage sb-${view}`}>
				<div className="sb-frame">
					<Site theme={theme} />
				</div>
			</main>
		</div>
	);
}

function Field({ control: c, value, onChange }: { control: Control; value: unknown; onChange: (v: unknown) => void }) {
	switch (c.type) {
		case 'color':
			return (
				<label className="sb-field sb-color">
					<span>{c.label}</span>
					<span className="sb-color-input">
						<code>{String(value)}</code>
						<input type="color" value={String(value)} onChange={(e) => onChange(e.target.value)} />
					</span>
				</label>
			);
		case 'range':
			return (
				<label className="sb-field">
					<span>
						{c.label}
						<b>
							{String(value)}
							{c.unit && ` ${c.unit}`}
						</b>
					</span>
					<input type="range" min={c.min} max={c.max} step={c.step ?? 1} value={Number(value)} onChange={(e) => onChange(Number(e.target.value))} />
				</label>
			);
		case 'select':
			return (
				<label className="sb-field sb-row">
					<span>{c.label}</span>
					<select value={String(value)} onChange={(e) => onChange(e.target.value)}>
						{c.options.map(([v, l]) => (
							<option key={v} value={v}>
								{l}
							</option>
						))}
					</select>
				</label>
			);
		case 'check':
			return (
				<label className="sb-field sb-row sb-check">
					<span>{c.label}</span>
					<input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
				</label>
			);
	}
}
