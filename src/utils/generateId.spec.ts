import { describe, expect, it } from 'vitest';

import { generateId } from './generateId';

describe('generateId', () => {
	it('should return a number', () => {
		const result = generateId();
		expect(typeof result).toBe('number');
	});

	it('should generate different numbers on multiple calls', () => {
		const results = new Set(Array.from({ length: 5 }, () => generateId()));
		expect(results.size).toBeGreaterThan(1);
	});
});
