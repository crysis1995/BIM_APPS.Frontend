import dotProp from 'dot-prop';

export const normalize = (array, by_key = 'id') =>
	array.reduce((prev, curr) => ({ ...prev, [dotProp.get(curr, by_key)]: curr }), {});
