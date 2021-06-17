// import { coloredElementsAdd, coloredElementsClean } from '../../../../components/ForgeViewer/redux/actions';
// import { config } from '../../../../config';
// import { hexToRgb } from '../../../../utils/hexToRgb';
// import {
// 	CLEAN_RESULTS,
// 	COLOR_RESULTS,
// 	RESET_RESULTS,
// 	RESULTS_FETCH_END,
// 	RESULTS_FETCH_ERROR,
// 	RESULTS_FETCH_START,
// 	RESULTS_SET_DATA,
// 	RESULTS_UPDATE_DATA,
// } from '../types';
//
// export const resultsColorByRoom = (active_job_id) => ({
// 	type: COLOR_RESULTS,
// 	active_job_id,
// });
//
// export const cleanResults = () => ({
// 	type: CLEAN_RESULTS,
// });
//
// export const resetResults = () => ({
// 	type: RESET_RESULTS,
// });
//
// export const colorResultByRoom = (job_id) => (dispatch, getState) => {
// 	const { active_job_id, byJobId } = getState().Odbiory.Results;
// 	const { model_rooms } = getState().ForgeViewer;
// 	if (job_id) {
// 		if (job_id === active_job_id) {
// 			dispatch(cleanResults());
// 			dispatch(coloredElementsClean());
// 		} else {
// 			dispatch(resultsColorByRoom(job_id));
// 			const elements = byJobId[job_id].elements;
// 			let toColor = {};
// 			for (let revit_id in model_rooms) {
// 				if (elements.hasOwnProperty(revit_id)) {
// 					const filtered = Object.keys(config.units.area.color_map).filter((e) =>
// 						config.units.area.color_map[e].condition(elements[revit_id]),
// 					)[0];
// 					toColor[model_rooms[revit_id]] = hexToRgb(config.units.area.color_map[filtered].color, true);
// 				} else {
// 					toColor[model_rooms[revit_id]] = hexToRgb(config.units.area.color_map[1].color, true);
// 				}
// 			}
// 			dispatch(coloredElementsAdd(toColor));
// 		}
// 	}
// };
//
// export const fetchResultStart = () => ({
// 	type: RESULTS_FETCH_START,
// });
// export const fetchResultEnd = () => ({
// 	type: RESULTS_FETCH_END,
// });
// export const fetchResultError = (error) => ({
// 	type: RESULTS_FETCH_ERROR,
// 	error,
// });
// export const setResultsByJobId = (jobId, result) => ({
// 	type: RESULTS_SET_DATA,
// 	jobId,
// 	result,
// });
//
// export const updateResultsByJobId = (jobId, summary_value, revit_id, percentage_value) => ({
// 	type: RESULTS_UPDATE_DATA,
// 	jobId,
// 	summary_value,
// 	revit_id,
// 	percentage_value,
// });
