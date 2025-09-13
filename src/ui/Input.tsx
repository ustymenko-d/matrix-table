import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	errors?: string;
};

const Input = ({ type, className, errors, ...props }: Props) => (
	<>
		<input
			type={type}
			min={1}
			{...props}
			className={clsx(
				'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className
			)}
		/>
		{errors && <span className='text-sm text-red-500'>{errors}</span>}
	</>
);

export default Input;
