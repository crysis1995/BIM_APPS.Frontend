import dotProp from 'dot-prop';
import { RoundNumber } from '../../../../utils/RoundNumber';
import data from '../__MOCK__/MONOLITHIC.upgrading.json';
import {
	CLEAN_SELECTION,
	REMOVE_ROOM_FROM_SELECTION,
	UPGRADING_HANDLE_SELECTED_ELEMENTS,
	UPGRADING_SET_ACTUAL_ELEMENTS,
	UPGRADING_SET_DATA,
	UPGRADING_SET_STATUSES,
	UPGRADING_UPDATE_JOB,
} from '../types';

const initialState = {
	byJobId: {},
	upgrading_loading: false,
	upgrading_error: null,
	MONOLITHIC: {
		byRevitId: data,
		actualElements: [],
		selectedElements: [],
	},
};

const UpgradingReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPGRADING_SET_ACTUAL_ELEMENTS:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					actualElements: action.elements,
				},
			};
		case UPGRADING_SET_STATUSES:
			return handleSetStatus(state, action);
		case UPGRADING_HANDLE_SELECTED_ELEMENTS:
			return handleSelectedElements(state, action);
		case UPGRADING_UPDATE_JOB:
			return updateJob(state, action);
		case UPGRADING_SET_DATA:
			return setData(state, action);
		case REMOVE_ROOM_FROM_SELECTION:
			return removeRoomFromUpgrading(state, action);
		case CLEAN_SELECTION:
			return removeAllRoomsFromUpgrading(state);
		default:
			return state;
	}
};

export default UpgradingReducer;

function setData(
	state,
	{ job_id, revit_id, particular_values, object_ids, summary_value, percentage_value, reference_job, current_value },
) {
	dotProp.set(state, `byJobId.${job_id}.particular_values.${revit_id}`, particular_values);
	dotProp.set(state, `byJobId.${job_id}.object_ids.${revit_id}`, object_ids);
	dotProp.set(state, `byJobId.${job_id}.summary_value.${revit_id}`, summary_value);
	dotProp.set(state, `byJobId.${job_id}.percentage_value.${revit_id}`, percentage_value);
	dotProp.set(state, `byJobId.${job_id}.reference_job.${revit_id}`, reference_job);
	dotProp.set(state, `byJobId.${job_id}.current_value.${revit_id}`, current_value);
	return { ...state };
}

function removeRoomFromUpgrading(state, { deletedRoom }) {
	Object.keys(state.byJobId).forEach((job_id) =>
		Object.keys(dotProp.get(state, `byJobId.${job_id}`)).forEach((data_key) =>
			dotProp.delete(state, `byJobId.${job_id}.${data_key}.${deletedRoom}`),
		),
	);
	return { ...state };
}

function removeAllRoomsFromUpgrading(state) {
	Object.keys(state.byJobId).forEach((job_id) =>
		Object.keys(dotProp.get(state, `byJobId.${job_id}`)).forEach((data_key) =>
			Object.keys(dotProp.get(state, `byJobId.${job_id}.${data_key}`)).forEach((revit_id) =>
				dotProp.delete(state, `byJobId.${job_id}.${data_key}.${revit_id}`),
			),
		),
	);
	return { ...state };
}

function updateJob(state, { job_id, revit_id, percentage_value, reference_job }) {
	dotProp.set(state, `byJobId.${job_id}.percentage_value.${revit_id}`, percentage_value);
	dotProp.set(state, `byJobId.${job_id}.reference_job.${revit_id}`, reference_job);
	dotProp.set(
		state,
		`byJobId.${job_id}.current_value.${revit_id}`,
		RoundNumber(dotProp.get(state, `byJobId.${job_id}.summary_value.${revit_id}`) * percentage_value),
	);
	return { ...state };
}

function handleSelectedElements(state, { elements }) {
	if (!!!elements) {
		return { ...state, MONOLITHIC: { ...state.MONOLITHIC, selectedElements: [] } };
	} else if (Array.isArray(elements)) {
		if (elements.toString() === state.MONOLITHIC.selectedElements.toString()) {
			return { ...state, MONOLITHIC: { ...state.MONOLITHIC, selectedElements: [] } };
		} else {
			return { ...state, MONOLITHIC: { ...state.MONOLITHIC, selectedElements: [...elements] } };
		}
	} else {
		const prev = state.MONOLITHIC.selectedElements;
		if (prev.includes(elements)) {
			return {
				...state,
				MONOLITHIC: { ...state.MONOLITHIC, selectedElements: [...prev.filter((e) => e !== elements)] },
			};
		} else {
			return {
				...state,
				MONOLITHIC: { ...state.MONOLITHIC, selectedElements: [...state.MONOLITHIC.selectedElements, elements] },
			};
		}
	}
}

function handleSetStatus(state, { selectedElements, status, rotation_day }) {
	if (Array.isArray(selectedElements) && selectedElements.length > 0) {
		selectedElements.forEach((revit_id) => {
			dotProp.set(state, `MONOLITHIC.byRevitId.${revit_id}.Status.id`, status);
			dotProp.set(state, `MONOLITHIC.byRevitId.${revit_id}.Status.rotation_day`, rotation_day);
			dotProp.set(state, `MONOLITHIC.byRevitId.${revit_id}.Status.updated_at`, new Date().toJSON());
		});
	}
	return { ...state };
}
