import { Epic, ofType } from 'redux-observable';

import ForgeViewer from '../../../types';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../actions';
import ModalActions from '../../../../../state/Modal/actions';
import { ModalType } from '../../../../../state/Modal/type';
import { RootActions, RootState } from '../../../../../state';

export const OnDeactivate3DModeEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		ofType(ForgeViewer.Redux.Types.DEACTIVATE_3D_VIEW),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const { current_level, sheets } = state.ForgeViewer;
			if (sheets && current_level) {
				const currentSheet = Object.values(sheets).find(
					(x) => x.name.includes(current_level) && x.name.toLowerCase().includes('wspro'),
				);
				if (currentSheet) return of(ForgeViewerActions.SetCurrentSheet(currentSheet.id));
			}
			return of(
				ModalActions.InitializeModal({
					modalType: ModalType.Payload.EModalType.Error,
					title: 'Uwaga',
					body: 'Nie można włączyć widoku dla poziomu: ' + current_level,
				}),
			);
		}),
	);
