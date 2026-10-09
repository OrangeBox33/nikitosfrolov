import type { CSSProperties } from 'react';

export type Theme = {
	// Цвета
	bg: string; // подложка
	card: string; // фон блока
	brown: string; // текст и заголовки
	accent: string; // красно-оранжевый
	extra: string; // четвёртый, песочный
	line: string; // рамки и разделители

	// Типографика
	fontHead: string; // заголовки
	fontBody: string; // текст в карточках
	fontUi: string; // подписи и кнопки
	fontProse: string; // непонятные тексты
	fontSize: number;
	headWeight: number;
	uppercase: boolean;

	// Сетка и блоки
	width: number;
	cols: number;
	gap: number;
	radius: number;
	pad: number;
	imageWidth: number;
	border: number;
	shadow: 'none' | 'soft' | 'lift';
	align: 'center' | 'left';
	voidHeight: number; // пустота до «42?» и после него

	// Вид блоков
	iconStyle: 'emoji' | 'number' | 'none';
	iconSize: number;
	indicator: 'plus' | 'chevron' | 'none';
	openStyle: 'border' | 'fill' | 'bar' | 'plain';
	btnStyle: 'fill' | 'outline';
	textsStyle: 'cards' | 'list';

	// Поведение
	hover: boolean;
	single: boolean;
	spanOpen: boolean;
	speed: number;
};

export const FONTS: Record<string, { css: string; google?: string }> = {
	'Системный': { css: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
	'Manrope': { css: '"Manrope", sans-serif', google: 'Manrope:wght@400;500;600;700;800' },
	'Inter': { css: '"Inter", sans-serif', google: 'Inter:wght@400;500;600;700;800' },
	'IBM Plex Sans': { css: '"IBM Plex Sans", sans-serif', google: 'IBM+Plex+Sans:wght@400;500;600;700' },
	'Golos Text': { css: '"Golos Text", sans-serif', google: 'Golos+Text:wght@400;500;600;700;800' },
	'Unbounded': { css: '"Unbounded", sans-serif', google: 'Unbounded:wght@400;500;600;700;800' },
	'PT Serif': { css: '"PT Serif", Georgia, serif', google: 'PT+Serif:wght@400;700' },
	'Lora': { css: '"Lora", Georgia, serif', google: 'Lora:wght@400;500;600;700' },
	'Literata': { css: '"Literata", Georgia, serif', google: 'Literata:opsz,wght@7..72,400;7..72,500;7..72,600;7..72,700' },
	'JetBrains Mono': { css: '"JetBrains Mono", ui-monospace, monospace', google: 'JetBrains+Mono:wght@400;500;600;700;800' },
};

export const defaultTheme: Theme = {
	bg: '#faf5ea',
	card: '#fffdf7',
	brown: '#3b2f22',
	accent: '#bd7350',
	extra: '#e9cd92',
	line: '#e2d5bb',

	fontHead: 'Lora',
	fontBody: 'Lora',
	fontUi: 'JetBrains Mono',
	fontProse: 'Literata',
	fontSize: 16,
	headWeight: 700,
	uppercase: false,

	width: 560,
	cols: 1,
	gap: 16,
	radius: 0,
	pad: 18,
	imageWidth: 180,
	border: 1,
	shadow: 'soft',
	align: 'center',
	voidHeight: 2000,

	iconStyle: 'emoji',
	iconSize: 22,
	indicator: 'none',
	openStyle: 'border',
	btnStyle: 'fill',
	textsStyle: 'list',

	hover: true,
	single: true,
	spanOpen: true,
	speed: 400,
};

type Palette = Pick<Theme, 'bg' | 'card' | 'brown' | 'accent' | 'extra' | 'line'>;

export const PALETTES: Record<string, Palette> = {
	'Терракота': { bg: '#f3e9d7', card: '#fbf6ec', brown: '#4e3626', accent: '#c0603e', extra: '#d9b77a', line: '#e2d3b8' },
	'Textbin': { bg: '#faf5ea', card: '#fffdf7', brown: '#3b2f22', accent: '#bd7350', extra: '#e9cd92', line: '#e2d5bb' },
	'Ржавчина': { bg: '#f6eedf', card: '#fffaf1', brown: '#5b3a29', accent: '#8f3d20', extra: '#e0a183', line: '#e6d6bb' },
	'Кофе с олив.': { bg: '#ede0cc', card: '#f7efe2', brown: '#3e2a1e', accent: '#a8503a', extra: '#8f9a6b', line: '#d9c7ab' },
	'Вечер': { bg: '#2a211b', card: '#352a22', brown: '#f0e2cc', accent: '#d9774f', extra: '#c9a66b', line: '#4a3b30' },
};

const SHADOWS: Record<Theme['shadow'], string> = {
	none: 'none',
	soft: '0 1px 2px rgb(60 40 20 / .06), 0 2px 8px rgb(60 40 20 / .05)',
	lift: '0 2px 4px rgb(60 40 20 / .08), 0 10px 28px rgb(60 40 20 / .10)',
};

export function themeVars(t: Theme): CSSProperties {
	return {
		'--bg': t.bg,
		'--card': t.card,
		'--brown': t.brown,
		'--accent': t.accent,
		'--extra': t.extra,
		'--line': t.line,
		'--isz': `${t.iconSize}px`,
		'--hfont': FONTS[t.fontHead]?.css,
		'--font': FONTS[t.fontBody]?.css,
		'--ufont': FONTS[t.fontUi]?.css,
		'--pfont': FONTS[t.fontProse]?.css,
		'--fs': `${t.fontSize}px`,
		'--hw': t.headWeight,
		'--tt': t.uppercase ? 'uppercase' : 'none',
		'--w': `${t.width}px`,
		'--cols': t.cols,
		'--gap': `${t.gap}px`,
		'--r': `${t.radius}px`,
		'--pad': `${t.pad}px`,
		'--imgw': `${t.imageWidth}px`,
		'--bw': `${t.border}px`,
		'--shadow': SHADOWS[t.shadow],
		'--align': t.align,
		'--void': `${t.voidHeight}px`,
		'--speed': `${t.speed}ms`,
	} as CSSProperties;
}

export function themeClasses(t: Theme): string {
	return [
		`open-${t.openStyle}`,
		`btn-${t.btnStyle}`,
		`texts-${t.textsStyle}`,
		t.hover && 'hover',
		t.spanOpen && 'span-open',
	]
		.filter(Boolean)
		.join(' ');
}

export function googleFontsHref(t: Theme): string | null {
	const families = [...new Set([t.fontHead, t.fontBody, t.fontUi, t.fontProse])].map((f) => FONTS[f]?.google).filter(Boolean);
	if (!families.length) return null;
	return `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join('&')}&display=swap`;
}
