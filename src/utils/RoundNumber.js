/**
 *
 * @param number {number}   Number to round
 * @param PRECISION {Integer}   Precision of operation
 * @return {number}
 * @constructor
 */
export const RoundNumber = (number, PRECISION = 2) => {
	return Math.floor(number * 10 ** PRECISION) / 10 ** PRECISION;
};
