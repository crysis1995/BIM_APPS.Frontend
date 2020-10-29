import { combineEpics, ofType } from 'redux-observable';
import { combineLatest, concat, EMPTY, from, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
	addVisibleElements,
	SET_MODEL_ELEMENTS,
	SET_SHEETS_SUCCESS,
	setCurrentSheet,
} from '../../../../components/ForgeViewer/redux/actions';
import { normalize } from '../../../../utils/normalize';
import { endFetchCranes, selectRotationDate, setLevelOptions, startFetchCranes } from '../actions/odbiory_actions';
import {
	ODBIORY_COMPONENT_DECREMENT_DAY,
	ODBIORY_COMPONENT_INCREMENT_DAY,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	ODBIORY_COMPONENT_SET_CRANE,
	ODBIORY_COMPONENT_SET_LEVEL,
	ODBIORY_COMPONENT_SET_LEVEL_OPTIONS,
	ODBIORY_COMPONENT_SET_ROTATION_DAY,
} from '../types';
import { ACCEPTANCE_TYPE } from '../types/constans';

export const setCranes = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE),
		filter(({ acceptance_type }) => acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC),
		switchMap(() =>
			concat(
				of(startFetchCranes()),
				from(fetchCranesFromApi(state$.value)).pipe(map((value) => endFetchCranes(normalize(value)))),
			),
		),
	);

export const setLevels = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_CRANE),
		map(({ crane_id }) =>
			setLevelOptions(normalize(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.cranes[crane_id].levels)),
		),
	);

export const setRotationDay = (action$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_LEVEL),
		map((value) => selectRotationDate(1)),
	);

export const loadSheet = (action$, state$) =>
	combineLatest([action$.pipe(ofType(SET_SHEETS_SUCCESS)), action$.pipe(ofType(ODBIORY_COMPONENT_SET_LEVEL))]).pipe(
		map(([_, { level_id }]) => {
			const level_name = state$.value.Odbiory.OdbioryComponent.MONOLITHIC.levels[level_id].name;
			const sheet = state$.value.ForgeViewer.sheets.filter(
				/**@param name {string}*/
				({ name }) => name.includes(level_name),
			);
			if (sheet.length === 1) {
				return setCurrentSheet(sheet[0].index);
			} else {
				return EMPTY;
			}
		}),
	);

export const handleIncrement = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_INCREMENT_DAY),
		map(() => selectRotationDate(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day + 1)),
	);
export const handleDecrement = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_DECREMENT_DAY),
		map(() => selectRotationDate(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day - 1)),
	);

export const handleAddVisibleElementToSheet = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(ODBIORY_COMPONENT_SET_ROTATION_DAY)),
		action$.pipe(ofType(SET_MODEL_ELEMENTS)),
	]).pipe(
		map(() => {
			const rotation_day = state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day;
			const object_values = state$.value.Odbiory.Upgrading.MONOLITHIC.byRevitId;
			const elements_object = state$.value.ForgeViewer.model_elements;
			let actual_day_elements = [];
			for (let revit_id of Object.keys(object_values)) {
				if (object_values[revit_id].Day <= rotation_day) {
					elements_object[revit_id] && actual_day_elements.push(elements_object[revit_id]);
				}
			}
			return addVisibleElements(actual_day_elements);
		}),
	);

const fetchCranesFromApi = async (project_id) => {
	return new Promise((resolve, reject) => {
		setTimeout(
			() =>
				resolve([
					{
						id: '1',
						name: '01',
						levels: [
							{ name: 'B03', id: '1' },
							{ name: 'B02', id: '2' },
							{ name: 'B01', id: '3' },
						],
					},
					{
						id: '2',
						name: '02',
						levels: [
							{ name: 'B02', id: '2' },
							{ name: 'B01', id: '3' },
						],
					},
				]),
			300,
		);
	});
};

export default combineEpics(
	setCranes,
	setLevels,
	setRotationDay,
	loadSheet,
	handleAddVisibleElementToSheet,
	handleIncrement,
	handleDecrement,
);
