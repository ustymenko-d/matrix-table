import clsx from 'clsx';
import type { LabelHTMLAttributes } from 'react';

type Props = LabelHTMLAttributes<HTMLLabelElement> & { text: string };

const Label = ({ htmlFor, className, text, children, ...props }: Props) => (
	<label
		htmlFor={htmlFor}
		className={clsx(
			'flex flex-col gap-2 text-balance text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
			className
		)}
		{...props}>
		{text}
		{children}
	</label>
);

export default Label;
