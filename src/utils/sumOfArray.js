/**
 *  Return sum of element from array and set precicion
 *
 * @param {[number]} array
 * @param {number} precision
 */
export const sumOfArray = (array, precision = 2) =>
	Math.floor(array.reduce((a, b) => a + b, 0) * 10 ** precision) / 10 ** precision;
