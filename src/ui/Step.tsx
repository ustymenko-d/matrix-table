import clsx from 'clsx';
import { Check } from 'lucide-react';

type Props = {
	isActive: boolean;
	isCompleted: boolean;
	label: string | number;
	withConnector?: boolean;
};

const Step = ({
	isActive,
	isCompleted,
	label,
	withConnector = false,
}: Props) => (
	<div
		className={clsx(
			'relative flex aspect-square h-14 w-14 items-center justify-center rounded-full border-2 border-solid',
			isActive || isCompleted ? 'border-primary' : 'border-muted-foreground',
			isCompleted && 'bg-primary',
			withConnector &&
				'after:absolute after:right-0 after:h-[2px] after:w-10 after:translate-x-[calc(100%+1.25rem)] after:rounded after:duration-200 after:content-[""]',
			withConnector &&
				(isCompleted ? 'after:bg-primary' : 'after:bg-muted-foreground')
		)}>
		{isCompleted ? (
			<Check size={28} strokeWidth={2.25} className='text-primary-foreground' />
		) : (
			<span
				className={clsx(
					'text-xl font-bold duration-200',
					isActive ? 'text-foreground' : 'text-muted-foreground'
				)}>
				{label}
			</span>
		)}
	</div>
);

export default Step;
