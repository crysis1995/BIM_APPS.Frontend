import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import { Epic, ofType } from 'redux-observable';
import WorkersLog from '../../../../types';
import { combineLatestWith, filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import LabourInputObjectsActions from '../../objects/actions';

const changeLevelEpic = (action$: Observable<RootActions>) =>
	action$.pipe(ofType(WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL));
const changeDateEpic = (action$: Observable<RootActions>) =>
	action$.pipe(ofType(WorkersLog.LabourInput.Redux.General.Types.SET_DATE));
const changeCrewEpic = (action$: Observable<RootActions>) =>
	action$.pipe(ofType(WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW));

export const HandleCleanSelectionEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	changeLevelEpic(action$).pipe(
		combineLatestWith(changeDateEpic(action$), changeCrewEpic(action$)),
		withLatestFrom(state$),
		filter(([_, state]) => state.WorkersLog.LabourInput.Objects.Selection.length > 0),
		map((data) => LabourInputObjectsActions.SelectObject([])),
	);
