import dotProp from 'dot-prop';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { CLEAN_SELECTION, REMOVE_ROOM_FROM_SELECTION, UPGRADING_SET_DATA, UPGRADING_UPDATE_JOB } from '../types';
import data from '../__MOCK__/MONOLITHIC.upgrading.json';

const initialState = {
	byJobId: {},
	upgrading_loading: false,
	upgrading_error: null,
	MONOLITHIC: {
		byRevitId: data,
	},
};

const UpgradingReducer = (state = initialState, action) => {
	switch (action.type) {
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
