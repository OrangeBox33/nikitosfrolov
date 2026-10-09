import type { ReactNode } from 'react';
import type { Theme } from '../theme';

type Props = {
	theme: Theme;
	index: number;
	icon: string;
	title: string;
	image?: string;
	open: boolean;
	onToggle: () => void;
	children: ReactNode;
};

// Блок-кнопка: по клику раскрывается на месте
export function Block({ theme, index, icon, title, image, open, onToggle, children }: Props) {
	return (
		<article className={`block${open ? ' open' : ''}${image ? ' has-image' : ''}`}>
			<button className="block-head" onClick={onToggle} aria-expanded={open}>
				{theme.iconStyle !== 'none' && (
					<span className="block-icon">
						{theme.iconStyle === 'emoji' ? <span className="icon-emoji">{icon}</span> : <span className="icon-number">{String(index + 1).padStart(2, '0')}</span>}
					</span>
				)}
				<span className="block-title">{title}</span>
				{theme.indicator !== 'none' && <span className={`block-ind ind-${theme.indicator}`} aria-hidden="true" />}
			</button>
			<div className="block-body">
				<div>
					<div className="block-inner">{children}</div>
				</div>
			</div>
			{image && (
				<div className="block-media">
					<div className="media-size" aria-hidden="true">
						<div>
							<img src={image} alt="" loading="lazy" />
						</div>
					</div>
					<div className="media-view">
						<img src={image} alt="" loading="lazy" />
					</div>
				</div>
			)}
		</article>
	);
}
