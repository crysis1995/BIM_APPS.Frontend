// import { ofType } from 'redux-observable';
// import { concat, of } from 'rxjs';
// import { filter, switchMap, throttleTime } from 'rxjs/operators';
// import { SET_CURRENT_SHEET } from '../../../../components/ForgeViewer/redux/actions';
// import ModalActions, { initialiseModal } from '../../../../components/Modal/redux/actions';
// import { ModalType } from '../../../../components/Modal/type';
// import { setInitial } from '../actions';
// import { _setCurrentLevel } from '../actions/levels_actions';
// import { fetchResultStart } from '../actions/results_actions';
// import { fetchRoomsStart } from '../actions/rooms_actions';
// import { termsDataFetchStart } from '../actions/terms_actions';
// import { ACCEPTANCE_TYPE } from '../types/constans';
//
// export const selectLevel = (action$, state$) =>
// 	action$.pipe(
// 		ofType(SET_CURRENT_SHEET),
// 		filter(() => state$.value.Odbiory.OdbioryComponent.active_acceptance_type === ACCEPTANCE_TYPE.ARCHITECTURAL),
// 		throttleTime(1000),
// 		switchMap(({ current_sheet }) => {
// 			const sheet = state$.value.ForgeViewer.sheets.filter((e) => e.index === current_sheet)[0];
// 			if (sheet) {
// 				const current_level = String(sheet.name.match(/.*(poziom.+\d)/i)[1]); // parsuje nazwę levelu wg zadanego wzoru
// 				return concat(
// 					of(setInitial()),
// 					of(_setCurrentLevel(current_level)),
// 					of(fetchRoomsStart()),
// 					of(fetchResultStart()),
// 					of(termsDataFetchStart()),
// 				);
// 			} else {
// 				return of(
// 					ModalActions.InitializeModal({
// 						title: 'Uwaga!',
// 						body: 'Nie możemy znaleźc tego poziomu',
// 						modalType: ModalType.Payload.EModalType.Error,
// 					}),
// 				);
// 			}
// 		}),
// 	);
