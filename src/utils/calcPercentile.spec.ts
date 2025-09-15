import { describe, expect, it } from 'vitest';

import { calcPercentile } from './calcPercentile';

describe('calcPercentile', () => {
	it('should return 0 for empty array', () => {
		expect(calcPercentile([])).toBe(0);
	});

	it('should return the element for single-element array', () => {
		expect(calcPercentile([42])).toBe(42);
	});

	it('should return correct value for exact index', () => {
		const arr = [10, 20, 30, 40, 50];
		expect(calcPercentile(arr, 0)).toBe(10);
		expect(calcPercentile(arr, 1)).toBe(50);
		expect(calcPercentile(arr, 0.5)).toBe(30);
	});

	it('should interpolate for non-integer index', () => {
		const arr = [10, 20, 30, 40];
		expect(calcPercentile(arr, 0.6)).toBeCloseTo(28);
	});

	it('should work with repeated numbers', () => {
		const arr = [1, 1, 5, 5, 7];
		expect(calcPercentile(arr)).toBe(5);
	});

	it('should work with default percentile 0.6', () => {
		const arr = [1, 2, 3, 4, 5];
		expect(calcPercentile(arr)).toBeCloseTo(3.4);
	});
});
