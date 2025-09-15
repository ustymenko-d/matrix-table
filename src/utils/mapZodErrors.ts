import type { ZodError } from 'zod/v3';

export const mapZodErrors = <T>(
	error: ZodError<T>
): Partial<Record<keyof T, string>> =>
	error.errors.reduce(
		(acc, curr) => {
			const key = curr.path[0] as keyof T;
			if (key) acc[key] = curr.message;
			return acc;
		},
		{} as Partial<Record<keyof T, string>>
	);
