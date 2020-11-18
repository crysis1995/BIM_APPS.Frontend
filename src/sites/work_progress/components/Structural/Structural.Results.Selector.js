import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { MONOLITHIC } from '../../redux/types/constans';
import { shallowEqualArrays } from 'shallow-equal';
import _ from 'lodash';

// // START STUFF TAKEN DIRECTLY FROM RESELECT SOURCE
// function defaultEqualityCheck(a, b) {
// 	return _.isEqual(a, b);
// }
//
// function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
// 	if (prev === null || next === null || prev.length !== next.length) {
// 		return false;
// 	}
//
// 	// Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
// 	const length = prev.length;
// 	let toReRender = false;
// 	for (let i = 0; i < length; i++) {
// 		toReRender = toReRender || !equalityCheck(prev[i], next[i]);
// 		// if (!equalityCheck(prev[i], next[i])) {
// 		// 	return false;
// 		// }
// 	}
// 	return toReRender;
// 	// return true;
// }
// // END STUFF TAKEN DIRECTLY FROM RESELECT SOURCE
//
// function customMemoize(func, resultEqualityCheck = defaultEqualityCheck, equalityCheck = defaultEqualityCheck) {
// 	let lastArgs = null;
// 	let lastResult = null;
// 	// we reference arguments instead of spreading them for performance reasons
// 	return function (...args) {
// 		if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, args)) {
// 			// apply arguments instead of spreading for performance.
// 			// lastResult = func.apply(null, arguments)
//
// 			// BEGIN CUSTOMIZATION OF MEMOIZE FUNCTION TO ALSO MEMOIZE RESULT
// 			const result = func.apply(null, args);
// 			if (!resultEqualityCheck(lastResult, result)) {
// 				lastResult = result;
// 			}
// 			// END CUSTOMIZATION OF MEMOIZE FUNCTION TO ALSO MEMOIZE RESULT
// 		}
//
// 		lastArgs = args;
// 		return lastResult;
// 	};
// }
//
// const createArrayResultSelector = createSelectorCreator(customMemoize);

export const ElementStatusSelector = createSelector(
	(state, revit_id) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId[revit_id],
	(object) => (object.hasOwnProperty('Status') ? object.Status.id : ''),
);

export const objectSelector = createSelector(
	[
		(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels_loading,
		(state) => state.Odbiory.Upgrading.MONOLITHIC.actualElements,
	],
	/**
	 * @param cranes_loading {Boolean}
	 * @param levels_loading {Boolean}
	 * @param byRevitId {Object}
	 * @param actualElements {Array}
	 * @return {*[]}
	 */
	(byRevitId, cranes_loading, levels_loading, actualElements) => {
		if (cranes_loading || levels_loading || actualElements.length === 0) return [];
		else return actualElements.map((revit_id) => byRevitId[revit_id]);
	},
);

export const selectedElements = createSelector(
	(state) => state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	(selectedElements) => selectedElements,
);

export const selectedItemsParamsSummary = createSelector(
	(state) => state.Odbiory.Upgrading.MONOLITHIC.actualElements,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
	(state, props, { isFiltered = true }) => isFiltered,
	(actualElements, selectedElements, byRevitId, isFiltered) =>
		selectedElements
			.filter((e) => (isFiltered ? actualElements.includes(e) : e))
			.reduce((prev, revit_id) => {
				const item = byRevitId[revit_id];
				const toFilters = MONOLITHIC.GROUP_BY.filter((e) => e.conditions.keys.includes(item.VCF_Realisation));
				if (toFilters.length > 1 || !!!toFilters) return prev;
				else {
					return {
						...prev,
						[toFilters[0].name]: Object.keys(toFilters[0].parameters).reduce((previous, key) => {
							if (
								!prev.hasOwnProperty(toFilters[0].name) ||
								!prev[toFilters[0].name].hasOwnProperty(key)
							) {
								return {
									...previous,
									[key]: item[key] || 0,
								};
							} else {
								return {
									...previous,
									[key]: toFilters[0].parameters[key](item[key] || 0, prev[toFilters[0].name][key]),
								};
							}
						}, {}),
					};
				}
			}, {}),
);
