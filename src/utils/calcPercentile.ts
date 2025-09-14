export const calcPercentile = (values: number[], percentile = 0.6): number => {
	if (values.length === 0) return 0;

	const sorted = [...values].sort((a, b) => a - b);
	const idx = (sorted.length - 1) * percentile;
	const lower = Math.floor(idx);
	const upper = Math.ceil(idx);

	if (lower === upper) return sorted[lower];

	const frac = idx - lower;
	return sorted[lower] + frac * (sorted[upper] - sorted[lower]);
};
