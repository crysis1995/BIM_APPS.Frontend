export const RoundNumber = (number, PRECISION = 2) => {
	return Math.floor(number * 10 ** PRECISION) / 10 ** PRECISION;
};
