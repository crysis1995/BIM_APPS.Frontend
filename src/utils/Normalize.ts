// function normalize<R extends { [key: string]: T }, T extends { [key: string]: string | number }>(
// 	array: Array<R>,
// 	key1: keyof R,
// 	key2: keyof T,
// );
// function normalize<R extends { [key: string]: string | number }>(array: Array<R>, key: keyof R);

function normalize<R extends { [key: string]: any }>(array: Array<R>, key: keyof R) {
	return array.reduce<{ [key: string]: R }>((prev, acc) => {
		const normId = acc[key];
		if (!prev.hasOwnProperty(normId)) {
			prev[normId] = acc;
		}
		return prev;
	}, {});
}

export default normalize;
