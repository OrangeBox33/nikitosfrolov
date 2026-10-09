import { useEffect, useRef } from 'react';

// 42 шрифта на 42 штуки «42». Из Google Fonts берём только глифы «4» и «2» (text=42):
// ~1.5 КБ на шрифт, ~65 КБ на все, и грузим их, только когда облако близко к экрану
const FONTS = [
	'Rubik Mono One', 'Bungee Shade', 'Monoton', 'Press Start 2P', 'Pacifico', 'Lobster',
	'Abril Fatface', 'Playfair Display', 'Bebas Neue', 'Righteous', 'Shrikhand', 'Rubik Glitch',
	'Rubik Wet Paint', 'Rubik Beastly', 'Nosifer', 'Creepster', 'UnifrakturMaguntia', 'Silkscreen',
	'VT323', 'Major Mono Display', 'Orbitron', 'Faster One', 'Fascinate', 'Ultra',
	'Alfa Slab One', 'Caveat', 'Permanent Marker', 'Rock Salt', 'Special Elite', 'Cinzel Decorative',
	'Bodoni Moda', 'Libre Barcode 39', 'Rampart One', 'Sixtyfour', 'Workbench', 'Jacquard 24',
	'DotGothic16', 'Zen Tokyo Zoo', 'Monofett', 'Codystar', 'Bungee Spice', 'Nabla',
];
const FALLBACKS = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
const COLORS = ['var(--brown)', 'var(--accent)', 'var(--extra)', 'var(--muted)'];

const FONTS_HREF = `https://fonts.googleapis.com/css2?${FONTS.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')}&text=42&display=swap`;

type Item = { font: string; x: number; y: number; size: number; rot: number; color: string; opacity: number };

// Детерминированный ГПСЧ: облако одинаковое у всех и не прыгает между рендерами
function mulberry32(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Раскладка в процентах облака. Центр оставляем под «42?», соседей стараемся не слеплять:
// радиус «42» оценён в процентах ширины, y приводим к тем же единицам через пропорции облака
function layout(): Item[] {
	const rand = mulberry32(42);
	const aspect = 0.8; // высота / ширина облака на десктопе
	const items: Item[] = [];
	FONTS.forEach((font, i) => {
		const size = 0.9 + rand() ** 1.6 * 2.6;
		const r = size * 2.4;
		let best = { x: 50, y: 50, gap: -Infinity };
		for (let attempt = 0; attempt < 300; attempt++) {
			const x = 6 + rand() * 88;
			const y = 6 + rand() * 88;
			if (((x - 50) / 20) ** 2 + ((y - 50) / 16) ** 2 < 1) continue;
			const gap = Math.min(
				Infinity,
				...items.map((o) => Math.hypot(o.x - x, (o.y - y) * aspect) - (o.size * 2.4 + r)),
			);
			if (gap > best.gap) best = { x, y, gap };
			if (gap > 1.5) break;
		}
		items.push({
			font: `"${font}", ${FALLBACKS[i % FALLBACKS.length]}`,
			x: best.x,
			y: best.y,
			size,
			rot: (rand() - 0.5) * 70,
			color: COLORS[Math.floor(rand() * COLORS.length)],
			opacity: 0.35 + rand() * 0.6,
		});
	});
	return items;
}

const ITEMS = layout();

export function Cloud({ center }: { center: string }) {
	const ref = useRef<HTMLDivElement>(null);
	useLazyFonts(ref);

	return (
		<div className="cloud" ref={ref}>
			{ITEMS.map((it, i) => (
				<span
					key={i}
					aria-hidden="true"
					style={{
						left: `${it.x}%`,
						top: `${it.y}%`,
						fontFamily: it.font,
						fontSize: `calc(var(--cloud-base) * ${it.size.toFixed(2)})`,
						transform: `translate(-50%, -50%) rotate(${it.rot.toFixed(1)}deg)`,
						color: it.color,
						opacity: it.opacity.toFixed(2),
					}}
				>
					42
				</span>
			))}
			<p className="secret">{center}</p>
		</div>
	);
}

let fontsRequested = false;

function useLazyFonts(ref: React.RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		if (fontsRequested || !ref.current) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting) || fontsRequested) return;
				fontsRequested = true;
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = FONTS_HREF;
				document.head.appendChild(link);
				io.disconnect();
			},
			{ rootMargin: '1500px 0px' },
		);
		io.observe(ref.current);
		return () => io.disconnect();
	}, [ref]);
}
