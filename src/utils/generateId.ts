// const globalId: number = 1;
// export const generateId = (): number => globalId++;

export const generateId = (): number => {
	const array = new Uint32Array(2);
	crypto.getRandomValues(array);

	return array[0] * 1_000_000_000 + array[1];
};
