import { Epic } from 'redux-observable';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import ForgeViewer from '../../../types';
import { EMPTY, of } from 'rxjs';
import ModalActions from '../../../../../state/Modal/actions';
import { ModalType } from '../../../../../state/Modal/type';
import ForgeViewerActions from '../../actions';
import { RootActions, RootState } from '../../../../../state';

export const OnChangeCurrentLevelEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(
			(action): action is ReturnType<ForgeViewer.Redux.IActions['SetCurrentLevel']> =>
				action.type === ForgeViewer.Redux.Types.SET_CURRENT_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const name = action.payload;
			if (name && state.ForgeViewer.sheets) {
				let sheet: string;
				if (state.ForgeViewer.is3DMode) {
					if (state.ForgeViewer.view3D) {
						sheet = state.ForgeViewer.view3D.id;
					} else {
						return of(
							ModalActions.InitializeModal({
								modalType: ModalType.Payload.EModalType.Error,
								title: 'Uwaga!',
								body: 'Nie znaleziono poprawnego modelu 3D',
							}),
						);
					}
				} else {
					const isSheet = Object.values(state.ForgeViewer.sheets).find((x) =>
						x.name.toLowerCase().includes(name.toLowerCase()),
					);
					if (isSheet) sheet = isSheet.id;
					else
						return of(
							ModalActions.InitializeModal({
								modalType: ModalType.Payload.EModalType.Error,
								title: 'Uwaga!',
								body: 'Nie znaleziono poprawnego rysunku!',
							}),
						);
				}
				return of(ForgeViewerActions.SetCurrentSheet(sheet));
			}

			return EMPTY;
		}),
	);
