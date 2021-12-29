export function GenerateValues(
	currentPage: number,
	min: number,
	max: number,
): [number | null, number, number, number, number | null] {
	const output: [number | null, number, number, number, number | null] = [null, 0, 0, 0, null];
	if (currentPage <= min + 2) {
		output[0] = min;
		output[1] = output[0] + 1;
		output[2] = output[1] + 1;
		output[3] = output[2] + 1;
		output[4] = null;
		return output;
	}
	if (currentPage >= max - 2) {
		output[0] = null;
		output[1] = max - 3;
		output[2] = max - 2;
		output[3] = max - 1;
		output[4] = max;
		return output;
	}

	output[0] = null;
	output[1] = currentPage - 1;
	output[2] = currentPage;
	output[3] = currentPage + 1;
	output[4] = null;

	return output;
}