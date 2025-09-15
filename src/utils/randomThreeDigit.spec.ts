import { describe, expect, it, vi } from 'vitest';

import { randomThreeDigit } from './randomThreeDigit';

describe('randomThreeDigit', () => {
	it('should return a number', () => {
		const result = randomThreeDigit();
		expect(typeof result).toBe('number');
	});

	it('should return 100 when Math.random() returns 0', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0);
		expect(randomThreeDigit()).toBe(100);
		vi.restoreAllMocks();
	});

	it('should return 999 when Math.random() is very close to 1', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0.999999);
		expect(randomThreeDigit()).toBe(999);
		vi.restoreAllMocks();
	});

	it('should return a middle value (e.g., 550) when Math.random() is predictable', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
		expect(randomThreeDigit()).toBe(550);
		vi.restoreAllMocks();
	});

	it('should return different values across multiple calls', () => {
		const results = new Set(
			Array.from({ length: 5 }, () => randomThreeDigit())
		);
		expect(results.size).toBeGreaterThan(1);
	});
});
