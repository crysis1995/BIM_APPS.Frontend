export const memoize = (fn) => {
	let cache = {};
	return (...args) => {
		let n = JSON.stringify(args); // just taking one argument here
		if (n in cache) {
			return cache[n];
		} else {
			let result = fn(...args);
			cache[n] = result;
			return result;
		}
	};
};
