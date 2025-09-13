import z from 'zod/v3';

const firstStep = z.object({
	rows: z
		.number({ required_error: 'Rows number is required' })
		.int()
		.min(1, 'Rows must be at least 1')
		.max(100, 'Rows cannot exceed 100'),
	cols: z
		.number({ required_error: 'Cols number is required' })
		.int()
		.min(1, 'Cols must be at least 1')
		.max(100, 'Cols cannot exceed 100'),
});

const secondStep = z.object({
	x: z
		.number({ required_error: 'X is required' })
		.int()
		.min(1, 'X must be at least 1')
		.refine((val) => val >= 1, { message: 'X must be at least 1' }),
});

export const FormValidation = {
	firstStep,
	secondStep,
};
