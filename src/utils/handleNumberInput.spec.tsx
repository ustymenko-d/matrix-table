/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';

import {
	handleNumberInputBlur,
	handleNumberInputChange,
	sanitizeAndClamp,
} from './handleNumberInput';

describe('sanitizeAndClamp', () => {
	it('removes leading zeros and clamps value', () => {
		expect(sanitizeAndClamp('007', 1, 10)).toBe(7);
		expect(sanitizeAndClamp('0', 1, 10)).toBe(1);
		expect(sanitizeAndClamp('15', 1, 10)).toBe(10);
		expect(sanitizeAndClamp('', 5, 20)).toBe(5);
	});
});

describe('handleNumberInputChange', () => {
	it('calls setValue with numeric value for digits', () => {
		const setValue = vi.fn();
		const handler = handleNumberInputChange(setValue);

		handler({ currentTarget: { value: '42' } } as any);
		expect(setValue).toHaveBeenCalledWith(42);

		handler({ currentTarget: { value: '' } } as any);
		expect(setValue).toHaveBeenCalledWith(0);
	});
});

describe('handleNumberInputBlur', () => {
	it('sanitizes and clamps value on blur', () => {
		const setValue = vi.fn();
		const handler = handleNumberInputBlur(setValue, 1, 100);

		handler({ currentTarget: { value: '007' } } as any);
		expect(setValue).toHaveBeenCalledWith(7);

		handler({ currentTarget: { value: '0' } } as any);
		expect(setValue).toHaveBeenCalledWith(1);

		handler({ currentTarget: { value: '101' } } as any);
		expect(setValue).toHaveBeenCalledWith(100);

		handler({ currentTarget: { value: '' } } as any);
		expect(setValue).toHaveBeenCalledWith(1);
	});
});
