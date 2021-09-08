import _ from 'lodash';

function isChanged(valueA: any, valueB: any) {
	// return JSON.stringify(valueA) !== JSON.stringify(valueB);
	return !_.isEqual(valueA, valueB);
}

export default isChanged;
