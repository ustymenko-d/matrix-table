import z from 'zod/v3';

const firstStep = z.object({
	rows: z.coerce
		.number({ required_error: 'Rows number is required' })
		.int()
		.min(1)
		.max(100),
	cols: z.coerce
		.number({ required_error: 'Cols number is required' })
		.int()
		.min(1)
		.max(100),
});

const secondStep = z.object({
	x: z.coerce.number({ required_error: 'X is required' }).int().min(1),
});

export const FormValidation = {
	firstStep,
	secondStep,
};
