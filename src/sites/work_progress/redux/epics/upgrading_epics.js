import { ofType } from 'redux-observable';
import { concat, from, of, EMPTY } from 'rxjs';
import { catchError, concatAll, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { objectJobFetchCompleted, objectJobFetchStart } from '../actions/jobs_actions';
import { updateJobInStore } from '../actions/upgrading_actions';
import { UPGRADE_BY_JOB } from '../types';
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
									].map((e) => parseInt(e)), // tablica z ID obiektów, których dotyczy dane
									// awansowanie roboty
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
