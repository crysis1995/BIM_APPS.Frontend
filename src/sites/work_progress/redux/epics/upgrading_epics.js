import { combineEpics, ofType } from 'redux-observable';
import { concat, EMPTY, from, iif, of } from 'rxjs';
import { catchError, filter, map, mapTo, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { FORGE_VIEWER_HANDLE_COLORIZE_FORGE } from '../../../../components/ForgeViewer/redux/actions';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { objectJobFetchCompleted, objectJobFetchStart } from '../actions/jobs_actions';
import { initSetTermsByGroup } from '../actions/terms_actions';
import {
	checkObjectsGroupTerms,
	handleSelectedElements,
	storeSetStatus,
	updateJobInStore,
} from '../actions/upgrading_actions';
import {
	UPGRADE_BY_JOB,
	UPGRADING_CHECK_OBJECT_GROUP_TERMS,
	UPGRADING_SET_STATUSES,
	UPGRADING_SET_STATUSES_INITIALIZER,
} from '../types';
import { MONOLITHIC } from '../types/constans';
import { createReferenceJob, updateObjectJob } from '../utils/jobs_utils';

export const upgradeJobEpic = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADE_BY_JOB),
		filter(() => state$.value.Odbiory.Rooms.selected_rooms.length > 0),
		switchMap(({ job_id, value }) =>
			concat(
				of(objectJobFetchStart()),
				from(state$.value.Odbiory.Rooms.selected_rooms).pipe(
					mergeMap((revit_id) => {
						let ref_update = EMPTY;
						if (
							state$.value.Odbiory.Upgrading.byJobId[job_id].reference_job.hasOwnProperty(revit_id) &&
							state$.value.Odbiory.Upgrading.byJobId[job_id].reference_job[revit_id]
						) {
							ref_update = from(
								updateObjectJob(
									state$.value.Odbiory.Upgrading.byJobId[job_id].reference_job[revit_id].id,
								),
							).pipe(
								catchError((err) => {
									console.log(err);
									return EMPTY;
								}),
							);
						}
						return concat(
							ref_update,
							from(
								createReferenceJob({
									room: state$.value.Odbiory.Rooms.byId[revit_id].id,
									job: job_id,
									percentage_value: value,
									current_value: RoundNumber(
										state$.value.Odbiory.Upgrading.byJobId[job_id].summary_value[revit_id] * value,
									),
									object_type: null, // obecnie niewykorzystywane - w przyszłości ID typu obiektu z bazy danych
									user: state$.value.CMSLogin.user.id.id, // ID usera z bazy danych - do śledzenia zmian dokonywanych osobowo
									objects: state$.value.Odbiory.Upgrading.byJobId[job_id].object_ids[
										revit_id
									].map((e) => parseInt(e)), // tablica z ID obiektów, których dotyczy dane awansowanie roboty
								}),
							).pipe(
								map((response) =>
									updateJobInStore(job_id, revit_id, value, response.acceptanceReferenceJob.id),
								),
								catchError((err) => {
									console.log(err);
									return EMPTY;
								}),
							),
						);
					}),
				),
				of(objectJobFetchCompleted()),
			),
		),
	);

const MONOLITHIC_handleSetStatus = (action$, state$) =>
	action$.pipe(ofType(UPGRADING_SET_STATUSES), mapTo({ type: FORGE_VIEWER_HANDLE_COLORIZE_FORGE }));

const handleInitSetStatus = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_SET_STATUSES_INITIALIZER),
		withLatestFrom(state$),
		mergeMap(([{ selectedElements, status, rotation_day }, state]) => {
			const api = new GraphQLAPIService();
			const objects = state.Odbiory.Upgrading.MONOLITHIC.byRevitId;
			const new_status = Object.values(state.Odbiory.OdbioryComponent.MONOLITHIC.statuses).filter(
				(e) => e.name === status,
			)[0];
			const user = state.CMSLogin.user.id.id;
			if (new_status) {
				return concat(
					from(selectedElements).pipe(
						mergeMap((revit_id) =>
							from(
								api.MONOLITHIC.createStatus(
									objects[revit_id].id,
									new Date().toISOString(),
									user,
									new_status.id,
								),
							).pipe(map((e) => storeSetStatus(selectedElements, new_status.id, rotation_day))),
						),
					),
					of(checkObjectsGroupTerms(selectedElements)),
				);
			} else {
				// return of({ type: '' });
				return EMPTY;
			}
		}),
	);

const handleSendStatusData = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_SET_STATUSES),
		withLatestFrom(state$),
		map(() => handleSelectedElements('')),
	);

const checkObjectsGroupTermsEpic = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_CHECK_OBJECT_GROUP_TERMS),
		withLatestFrom(state$),
		mergeMap(([{ selectedElements }, state]) => {
			const { active_crane, active_level } = state.Odbiory.OdbioryComponent.MONOLITHIC;
			const { byRevitId } = state.Odbiory.Upgrading.MONOLITHIC;
			const groupObjects = state.Odbiory.Upgrading.MONOLITHIC?.byCrane?.[active_crane]?.byLevel?.[active_level];
			if (!groupObjects) return EMPTY;
			else {
				return from(Object.keys(groupObjects)).pipe(
					mergeMap((group_key) => {
						const { needUpgradeFinishDate, needUpgradeStartDate } = checkObjectsTerms(
							groupObjects[group_key].filter((e) => !selectedElements.includes(e)),
							byRevitId,
						);
						return concat(
							iif(
								needUpgradeFinishDate,
								initSetTermsByGroup(
									active_crane,
									active_level,
									group_key,
									MONOLITHIC.TERM_TYPE.REAL_FINISH.id,
									new Date().toISOString(),
								),
							),
							iif(
								needUpgradeStartDate,
								initSetTermsByGroup(
									active_crane,
									active_level,
									group_key,
									MONOLITHIC.TERM_TYPE.REAL_START.id,
									new Date().toISOString(),
								),
							),
						);
					}),
				);
			}
		}),
	);
function checkObjectsTerms(filtered_revit_ids, normalized_revit_objects) {
	return filtered_revit_ids.reduce(
		(prev, actual_revit_id) => {
			const obj = normalized_revit_objects[actual_revit_id];
			if (obj?.statuses && obj?.statuses?.length > 0) {
				// sa statusy czyli finishDate na true
				prev.needUpgradeFinishDate = prev.needUpgradeFinishDate && true;
				prev.needUpgradeStartDate = prev.needUpgradeStartDate && false;
			} else {
				// nie ma statusow czyli klikam pierwszy element (startDate na true)
				prev.needUpgradeFinishDate = prev.needUpgradeFinishDate && false;
				prev.needUpgradeStartDate = prev.needUpgradeStartDate && true;
			}
		},
		{
			needUpgradeFinishDate: true,
			needUpgradeStartDate: true,
		},
	);
}

export default combineEpics(
	upgradeJobEpic,
	MONOLITHIC_handleSetStatus,
	handleInitSetStatus,
	handleSendStatusData,
	checkObjectsGroupTermsEpic,
);
