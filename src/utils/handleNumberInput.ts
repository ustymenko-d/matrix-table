export const sanitizeAndClamp = (
	value: string,
	min: number,
	max: number
): number => {
	const sanitized = value.replace(/^0+(?=\d)/, '');
	const numeric = +sanitized || min;

	return Math.max(min, Math.min(max, numeric));
};

export const handleNumberInputChange =
	(setValue: (val: number) => void) =>
	(e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;

		if (/^\d*$/.test(value)) {
			setValue(value === '' ? 0 : +value);
		}
	};

export const handleNumberInputBlur =
	(setValue: (val: number) => void, min = 1, max = 100) =>
	(e: React.FocusEvent<HTMLInputElement>) => {
		const clamped = sanitizeAndClamp(e.currentTarget.value, min, max);
		setValue(clamped);
	};
