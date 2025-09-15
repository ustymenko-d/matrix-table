import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { handleNumberInputChange } from './handleNumberInput';

describe('handleNumberInputChange', () => {
	it('sanitizes input and sets clamped value', () => {
		const TestComponent = () => {
			const [val, setVal] = useState(0);

			return (
				<input
					value={val}
					onInput={handleNumberInputChange(setVal, 1, 100)}
					data-testid='input'
				/>
			);
		};

		const { getByTestId } = render(<TestComponent />);
		const input = getByTestId('input') as HTMLInputElement;

		fireEvent.input(input, { target: { value: '0050' } });
		expect(input.value).toBe('50');

		fireEvent.input(input, { target: { value: '200' } });
		expect(input.value).toBe('100');

		fireEvent.input(input, { target: { value: '0' } });
		expect(input.value).toBe('1');
	});
});
