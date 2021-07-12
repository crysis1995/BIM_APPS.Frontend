import { Epic, ofType } from 'redux-observable';
import { RootActions } from '../../../../../reducers/type';
import { RootState } from '../../../../../store';
import ForgeViewer from '../../../types';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../actions';
import ModalActions from '../../../../Modal/redux/actions';
import { ModalType } from '../../../../Modal/type';

export const OnDeactivate3DModeEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
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
