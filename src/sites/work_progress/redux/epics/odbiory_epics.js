import { combineEpics, ofType } from 'redux-observable';
import { combineLatest, concat, EMPTY, from, iif, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
	coloredElementsAdd,
	coloredElementsClean,
	disabledElementsAdd,
	disabledElementsClean,
	hiddenElementsAdd,
	hiddenElementsClean,
	selectedElementsAdd,
	selectedElementsClean,
	SET_MODEL_ELEMENTS,
	SET_SHEETS_SUCCESS,
	setCurrentSheet,
	visibleElementsAdd,
	visibleElementsClean
} from '../../../../components/ForgeViewer/redux/actions';
import { normalize } from '../../../../utils/normalize';
import { changeLevel, endFetchCranes, selectRotationDate, setLevelOptions, startFetchCranes } from '../actions/odbiory_actions';
import { setCurrentVisibleElements } from '../actions/upgrading_actions';
import {
	ODBIORY_COMPONENT_DECREMENT_DAY,
	ODBIORY_COMPONENT_INCREMENT_DAY,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	ODBIORY_COMPONENT_SET_CRANE,
	ODBIORY_COMPONENT_SET_LEVEL,
	ODBIORY_COMPONENT_SET_ROTATION_DAY,
	UPGRADING_HANDLE_SELECTED_ELEMENTS
} from '../types';
import { ACCEPTANCE_TYPE } from '../types/constans';
import { filterTree } from '../utils/odbiory_utils';


export const handleChangeAppType = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE),
		mergeMap(() => concat(of(coloredElementsClean()))),
	);

export const setCranes = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE),
		filter(({ acceptance_type }) => acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC),
		mergeMap(() =>
			concat(
				of(startFetchCranes()),
				from(fetchCranesFromApi(state$.value)).pipe(map((value) => endFetchCranes(normalize(value)))),
			),
		),
	);

export const setLevels = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_CRANE),
		mergeMap(({ crane_id }) => {
			const { cranes, active_level } = state$.value.Odbiory.OdbioryComponent.MONOLITHIC;
			const level_options = normalize(cranes[crane_id].levels);
			return concat(
				iif(
					() => !!active_level,
					iif(() => !!!level_options[active_level], of(changeLevel('')), EMPTY),
					EMPTY,
				),
				of(setLevelOptions(level_options)),
			);
		}),
	);

export const handleChangeLevel = (action$, state$) => {
	return combineLatest([
		action$.pipe(ofType(SET_SHEETS_SUCCESS)),
		action$.pipe(ofType(ODBIORY_COMPONENT_SET_LEVEL)),
	]).pipe(
		filter(([_, { level_id }]) => !!level_id),
		mergeMap(([_, { level_id }]) =>
			concat(
				of(selectedElementsClean()),
				of(visibleElementsClean()),
				of(coloredElementsClean()),
				of(disabledElementsClean()),
				of(hiddenElementsClean()),
				iif(
					() => !!!state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
					of(selectRotationDate(1)),
					EMPTY,
				),
				from([
					state$.value.ForgeViewer.sheets.filter(
						/**@param name {string}*/
						({ name }) =>
							name.includes(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.levels[level_id].name),
					),
				]).pipe(
					switchMap((sheet) => (sheet.length === 1 ? of(setCurrentSheet(sheet[0].index)) : of({ type: '' }))),
				),
			),
		),
	);
};

export const handleIncrement = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_INCREMENT_DAY),
		switchMap(() => of(selectRotationDate(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day + 1))),
	);
export const handleDecrement = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_DECREMENT_DAY),
		switchMap(() => of(selectRotationDate(state$.value.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day - 1))),
	);

export const handleChangeElementsFilters = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(ODBIORY_COMPONENT_SET_CRANE)),
		action$.pipe(ofType(ODBIORY_COMPONENT_SET_LEVEL)),
		action$.pipe(ofType(ODBIORY_COMPONENT_SET_ROTATION_DAY)),
		action$.pipe(ofType(SET_MODEL_ELEMENTS)),
	]).pipe(
		withLatestFrom(state$),
		filter(([[_, { level_id }], state]) => !state.ForgeViewer.model_elements_loading && level_id !== ''),
		switchMap(([_, state]) => {
			const { active_level, levels, active_crane, cranes } = state.Odbiory.OdbioryComponent.MONOLITHIC;
			const level = levels[active_level] && levels[active_level].name;
			const crane = cranes[active_crane] && cranes[active_crane].name;
			const rotation_day = state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day;
			const object_values = state.Odbiory.Upgrading.MONOLITHIC.byRevitId;
			const elements_object = state.ForgeViewer.model_elements;

			const {
				colored_elements,
				disabled_elements,
				hidden_elements,
				visible_elements,
				current_elements,
			} = filterTree(object_values, elements_object, crane, level, rotation_day);
			return concat(
				of(setCurrentVisibleElements(current_elements)),
				of(visibleElementsAdd(visible_elements)),
				of(coloredElementsAdd(colored_elements)),
				of(disabledElementsAdd(disabled_elements)),
				of(hiddenElementsAdd(hidden_elements)),
			);
		}),
	);

export const handleForgeSelection = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_HANDLE_SELECTED_ELEMENTS),
		withLatestFrom(state$),
		switchMap(([_, state]) => {
			const elements_object = state.ForgeViewer.model_elements;
			const selectedElements = state.Odbiory.Upgrading.MONOLITHIC.selectedElements;
			let selected_elements = new Set();
			selectedElements.forEach((revit_id) => {
				const forge_id = elements_object.hasOwnProperty(revit_id) && elements_object[revit_id];
				forge_id && selected_elements.add(forge_id);
			});
			return of(selectedElementsAdd([...selected_elements]));
		}),
	);

// export const handleSelectionOnSheet = (action$, state$) => action$.pipe(
// 	ofType(FORGE_VIEWER_SELECTED_ELEMENTS_ADD),
// 	switchMap(({elements}) => {
//
// 		return of(handleSelectedElements())
// 	})
// )

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
						],
					},
					{
						id: '2',
						name: '02',
						levels: [
							{ name: 'B03', id: '1' },
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
	handleChangeLevel,
	handleIncrement,
	handleDecrement,
	handleChangeElementsFilters,
	handleForgeSelection,handleChangeAppType
);
