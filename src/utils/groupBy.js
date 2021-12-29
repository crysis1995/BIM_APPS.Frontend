import _ from 'lodash';


export default function groupBy(data, groupedKeysArray = [], storeParamsArray = [], simplifyKey = 'revit_id') {
	if (groupedKeysArray.length === 0) return simplifyKey ? data.map((e) => e[simplifyKey]) : data;
	const key = storeParamsArray.shift();
	const groupByKey = groupedKeysArray.shift();
	const groupedObjects = _.groupBy(data, groupByKey);
	if (key) {
		return {
			[key]: Object.keys(groupedObjects).reduce((prev, key) => {
				prev[key] = groupBy(groupedObjects[key], [...groupedKeysArray], [...storeParamsArray]);
				return prev;
			}, {}),
		};
	} else {
		return Object.keys(groupedObjects).reduce((prev, key) => {
			prev[key] = groupBy(groupedObjects[key], [...groupedKeysArray], [...storeParamsArray]);
			return prev;
		}, {});
	}
}
