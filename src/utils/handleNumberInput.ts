const clamp = (v: number, min: number, max: number): number =>
	Math.max(min, Math.min(max, v));

const sanitizeAndClamp = (value: string, min: number, max: number): number => {
	const sanitized = value.replace(/^0+(?=\d)/, '');
	return clamp(+sanitized || 0, min, max);
};

export const handleNumberInputChange =
	(setValue: (val: number) => void, min = 1, max = 100) =>
	(e: React.FormEvent<HTMLInputElement>) => {
		const input = e.currentTarget;
		input.value = input.value.replace(/^0+(?=\d)/, '');
		setValue(sanitizeAndClamp(input.value, min, max));
	};
