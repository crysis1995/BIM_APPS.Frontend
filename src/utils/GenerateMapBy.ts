export function generateMapBy<R extends { [key: string]: any }, T extends keyof R>(
	array: Array<R>,
	groupByKey: T,
	valueOf: T,
) {
	return array.reduce<{ [key: string]: R[T] }>((previousValue, currentValue) => {
		const normID = currentValue[groupByKey];
		if (!previousValue.hasOwnProperty(normID)) {
			previousValue[normID] = currentValue[valueOf];
		}
		return previousValue;
	}, {});
}
