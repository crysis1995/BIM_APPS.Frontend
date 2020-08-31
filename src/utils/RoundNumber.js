const PRECISION = 2;

export const RoundNumber = (number) => {
	return Math.floor(number * 10 ** PRECISION) / 10 ** PRECISION;
};
