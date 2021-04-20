import { combineEpics, ofType } from 'redux-observable';
import { concat, EMPTY, from, iif, of } from 'rxjs';
import { catchError, filter, map, mapTo, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { FORGE_VIEWER_HANDLE_COLORIZE_FORGE } from '../../../../components/ForgeViewer/redux/actions';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { objectJobFetchCompleted, objectJobFetchStart } from '../actions/jobs_actions';
import { initUpdateTermsByGroup } from '../actions/terms_actions';
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
import { TERM_TYPE } from '../types/constans';
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
									user: state$.value.CMSLogin.user.id, // ID usera z bazy danych - do śledzenia zmian dokonywanych osobowo
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

const MONOLITHIC_handleSetStatus = (action$) =>
	action$.pipe(ofType(UPGRADING_SET_STATUSES), mapTo({ type: FORGE_VIEWER_HANDLE_COLORIZE_FORGE }));

const handleInitSetStatus = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_SET_STATUSES_INITIALIZER),
		withLatestFrom(state$),
		switchMap(([{ selectedElements, status, rotation_day, choose_date }, state]) => {
			const api = new GraphQLAPIService();
			const objects = state.Odbiory.Upgrading.MONOLITHIC.byRevitId;
			const new_status = Object.values(state.Odbiory.OdbioryComponent.MONOLITHIC.statuses).filter(
				(e) => e.name === status,
			)[0];
			const user_id = state.CMSLogin.user.id;
			return !!new_status
				? concat(
						from(selectedElements).pipe(
							mergeMap((revit_id) =>
								from(
									api.MONOLITHIC.createStatus({
										user_id,
										date: choose_date,
										status_id: new_status.id,
										object_id: objects[revit_id].id,
									}),
								).pipe(map((e) => storeSetStatus(selectedElements, new_status.id, rotation_day))),
							),
						),
						of(checkObjectsGroupTerms(selectedElements)),
				  )
				: EMPTY;
		}),
	);

const handleSendStatusData = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_SET_STATUSES),
		withLatestFrom(state$),
		map(() => handleSelectedElements('')),
	);

function getStateData(state) {
	const { active_crane, cranes, active_level, levels } = state.Odbiory.OdbioryComponent.MONOLITHIC;
	const { byRevitId } = state.Odbiory.Upgrading.MONOLITHIC;

	// terms object
	const { byGroup } = state.Odbiory.Terms.MONOLITHIC?.terms?.byCrane?.[cranes[active_crane].crane.name]?.byLevel?.[
		levels[active_level].name
	];

	const groupObjects = state.Odbiory.Upgrading.MONOLITHIC?.byCrane?.[active_crane]?.byLevel?.[active_level];
	return { groupObjects, byRevitId, groupedTerms: byGroup };
}
const checkObjectsGroupTermsEpic = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_CHECK_OBJECT_GROUP_TERMS),
		withLatestFrom(state$),
		switchMap(([{ selectedElements }, state]) => {
			const { groupObjects, groupedTerms, byRevitId } = getStateData(state);
			if (!groupObjects) return EMPTY;
			else {
				return from(Object.keys(groupObjects)).pipe(
					mergeMap((group_key) => {
						const { needUpgradeTermState, termsObject } = checkObjectsTerms(
							selectedElements.filter((revit_id) => groupObjects[group_key].includes(parseInt(revit_id))),
							byRevitId,
							groupObjects[group_key],
							groupedTerms[group_key],
						);
						return iif(() => needUpgradeTermState, of(initUpdateTermsByGroup(termsObject)));
					}),
				);
			}
		}),
	);
export function checkObjectsTerms(actualGroupedRevitIds, byRevitId, allElementsInGroup, termsObject) {
	termsObject = { ...termsObject }; // must copy object

	let needUpgradeTermState = false;
	if (actualGroupedRevitIds.length > 0) {
		needUpgradeTermState = true;
		const dbElements = actualGroupedRevitIds.map((revitId) => byRevitId[revitId].id);

		if (termsObject.objects.length === 0) {
			termsObject[TERM_TYPE.REAL_START.id] = new Date().toISOString();
		}
		termsObject.objects = termsObject.objects.map((obj) => obj.id);
		termsObject.objects = termsObject.objects.concat(dbElements);
		const isComplete = termsObject.objects.length === allElementsInGroup.length;
		if (isComplete) {
			termsObject[TERM_TYPE.REAL_FINISH.id] = new Date().toISOString();
		}
	}

	return { needUpgradeTermState, termsObject };
}

export default combineEpics(
	upgradeJobEpic,
	MONOLITHIC_handleSetStatus,
	handleInitSetStatus,
	handleSendStatusData,
	checkObjectsGroupTermsEpic,
);
