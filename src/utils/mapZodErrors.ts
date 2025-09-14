import type { ZodError } from 'zod/v3';

export const mapZodErrors = (error: ZodError): Record<string, string> =>
	error.errors.reduce(
		(acc, curr) => {
			const key = curr.path[0]?.toString();
			if (key) acc[key] = curr.message;
			return acc;
		},
		{} as Record<string, string>
	);
