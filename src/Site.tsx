import { useEffect, useState } from 'react';
import { Block } from './components/Block';
import { Cloud } from './components/Cloud';
import { projects } from './content/projects';
import { site } from './content/site';
import { texts } from './content/texts';
import { googleFontsHref, themeClasses, themeVars, type Theme } from './theme';
import './site.css';

export function Site({ theme }: { theme: Theme }) {
	const [open, setOpen] = useState<string[]>([]);

	useGoogleFonts(googleFontsHref(theme));

	const toggle = (id: string) =>
		setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : theme.single ? [id] : [...cur, id]));

	return (
		<div className={`site ${themeClasses(theme)}`} style={themeVars(theme)}>
			<div className="wrap">
				<header className="head">
					<h1>{site.name}</h1>
					<p className="intro">{site.intro}</p>
				</header>

				<div className="grid">
					{projects.map((p, i) => (
						<Block key={p.id} theme={theme} index={i} icon={p.icon} title={p.title} image={p.image} open={open.includes(p.id)} onToggle={() => toggle(p.id)}>
							{p.details.map((d) => (
								<p key={d}>{d}</p>
							))}
							<div className="block-foot">
								<a className="btn" href={p.link.href} target="_blank" rel="noreferrer">
									{p.link.label}
								</a>
							</div>
						</Block>
					))}
				</div>

				<footer className="foot">
					{site.links.map((l) => (
						<a key={l.label} href={l.href} target="_blank" rel="noreferrer">
							{l.label}
						</a>
					))}
				</footer>

				{/* Тексты спрятаны: после проектов долго идёт пустой фон */}
				<div className="void" />
				<Cloud center={site.secret} />
				<div className="void" />
				<h2 className="texts-title">{site.textsTitle}</h2>
				<div className="grid texts">
					{texts.map((t, i) => (
						<Block key={t.id} theme={theme} index={i} icon={t.icon} title={t.title} open={open.includes(t.id)} onToggle={() => toggle(t.id)}>
							<div className="prose" dangerouslySetInnerHTML={{ __html: t.html }} />
						</Block>
					))}
				</div>

			</div>
		</div>
	);
}

function useGoogleFonts(href: string | null) {
	useEffect(() => {
		if (!href) return;
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;
		document.head.appendChild(link);
		return () => link.remove();
	}, [href]);
}
