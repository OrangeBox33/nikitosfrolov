import { FONTS, type Theme } from '../theme';

type Key = keyof Theme;
type Opt = [value: string, label: string];

export type Control =
	| { key: Key; label: string; type: 'color' }
	| { key: Key; label: string; type: 'range'; min: number; max: number; step?: number; unit?: string }
	| { key: Key; label: string; type: 'select'; options: Opt[] }
	| { key: Key; label: string; type: 'check' };

const fonts: Opt[] = Object.keys(FONTS).map((f) => [f, f]);

export const GROUPS: { title: string; controls: Control[] }[] = [
	{
		title: 'Цвета',
		controls: [
			{ key: 'bg', label: 'Подложка', type: 'color' },
			{ key: 'card', label: 'Блок', type: 'color' },
			{ key: 'brown', label: 'Коричневый · текст', type: 'color' },
			{ key: 'accent', label: 'Акцент', type: 'color' },
			{ key: 'extra', label: 'Четвёртый', type: 'color' },
			{ key: 'line', label: 'Линии', type: 'color' },
		],
	},
	{
		title: 'Шрифт',
		controls: [
			{ key: 'fontHead', label: 'Заголовки', type: 'select', options: fonts },
			{ key: 'fontBody', label: 'Текст в блоках', type: 'select', options: fonts },
			{ key: 'fontUi', label: 'Подписи и кнопки', type: 'select', options: fonts },
			{ key: 'fontProse', label: 'Непонятные тексты', type: 'select', options: fonts },
			{ key: 'fontSize', label: 'Размер', type: 'range', min: 13, max: 20, unit: 'px' },
			{ key: 'headWeight', label: 'Жирность заголовков', type: 'range', min: 400, max: 800, step: 100 },
			{ key: 'uppercase', label: 'Заголовки капсом', type: 'check' },
		],
	},
	{
		title: 'Сетка',
		controls: [
			{ key: 'align', label: 'Шапка', type: 'select', options: [['center', 'по центру'], ['left', 'слева']] },
			{ key: 'cols', label: 'Колонок на десктопе', type: 'range', min: 1, max: 3 },
			{ key: 'width', label: 'Ширина колонки', type: 'range', min: 260, max: 760, step: 10, unit: 'px' },
			{ key: 'gap', label: 'Между блоками', type: 'range', min: 0, max: 32, unit: 'px' },
			{ key: 'voidHeight', label: 'Пустота перед текстами', type: 'range', min: 200, max: 4000, step: 100, unit: 'px' },
			{ key: 'spanOpen', label: 'Раскрытый — на всю ширину', type: 'check' },
		],
	},
	{
		title: 'Блоки',
		controls: [
			{ key: 'radius', label: 'Скругление', type: 'range', min: 0, max: 28, unit: 'px' },
			{ key: 'pad', label: 'Внутренний отступ', type: 'range', min: 10, max: 32, unit: 'px' },
			{ key: 'imageWidth', label: 'Ширина картинки', type: 'range', min: 100, max: 300, step: 10, unit: 'px' },
			{ key: 'border', label: 'Рамка', type: 'range', min: 0, max: 3, unit: 'px' },
			{ key: 'shadow', label: 'Тень', type: 'select', options: [['none', 'нет'], ['soft', 'мягкая'], ['lift', 'парящая']] },
			{ key: 'iconStyle', label: 'Слева', type: 'select', options: [['emoji', 'смайлик'], ['number', 'номер'], ['none', 'ничего']] },
			{ key: 'iconSize', label: 'Размер смайлика', type: 'range', min: 14, max: 36, unit: 'px' },
			{ key: 'indicator', label: 'Справа', type: 'select', options: [['plus', 'плюс'], ['chevron', 'стрелка'], ['none', 'ничего']] },
			{ key: 'openStyle', label: 'Раскрытый блок', type: 'select', options: [['border', 'рамка акцентом'], ['fill', 'заливка четвёртым'], ['bar', 'полоска слева'], ['plain', 'без выделения']] },
			{ key: 'btnStyle', label: 'Кнопка', type: 'select', options: [['fill', 'залитая'], ['outline', 'контурная']] },
			{ key: 'textsStyle', label: 'Тексты', type: 'select', options: [['list', 'списком'], ['cards', 'блоками']] },
		],
	},
	{
		title: 'Поведение',
		controls: [
			{ key: 'single', label: 'Раскрыт только один', type: 'check' },
			{ key: 'hover', label: 'Приподнимать при наведении', type: 'check' },
			{ key: 'speed', label: 'Скорость раскрытия', type: 'range', min: 0, max: 800, step: 20, unit: 'мс' },
		],
	},
];
