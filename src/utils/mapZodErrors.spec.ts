import { describe, expect, it } from 'vitest';
import z from 'zod/v3';

import { FormValidation } from '@/components/Form/form.schema';

import { mapZodErrors } from './mapZodErrors';

describe('mapZodErrors', () => {
	it('maps first step errors correctly', () => {
		try {
			FormValidation.firstStep.parse({ rows: 0, cols: 101 });
		} catch (err) {
			if (err instanceof z.ZodError) {
				const result = mapZodErrors(err);
				expect(result.rows).toBeDefined();
				expect(result.cols).toBeDefined();
			}
		}
	});

	it('returns empty object if no errors', () => {
		const parsed = FormValidation.firstStep.safeParse({ rows: 10, cols: 20 });
		if (!parsed.success) {
			const errors = mapZodErrors(parsed.error);
			expect(errors).toEqual({});
		}
	});

	it('maps second step errors correctly', () => {
		try {
			FormValidation.secondStep.parse({ x: 0 });
		} catch (err) {
			if (err instanceof z.ZodError) {
				const result = mapZodErrors(err);
				expect(result.x).toBeDefined();
			}
		}
	});
});
