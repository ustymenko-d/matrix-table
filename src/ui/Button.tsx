import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
	icon?: boolean;
};

const variants: Record<Variant, string> = {
	default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
	destructive:
		'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
	outline:
		'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
	secondary:
		'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
};

const Button = ({
	variant = 'default',
	icon = false,
	className,
	children,
	...props
}: Props) => {
	return (
		<button
			className={clsx(
				'inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors',

				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

				icon ? 'p-2' : 'px-4 py-2',

				variants[variant],

				className
			)}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
