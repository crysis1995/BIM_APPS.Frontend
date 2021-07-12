import { combineEpics, Epic } from 'redux-observable';
import { ModalType } from '../type';
import { filter, mergeMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import ModalActions from './actions';
import { RootActions } from '../../../reducers/type';

const onModalInitialize: Epic<RootActions, RootActions> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<ModalType.Redux.IActions['InitializeModal']> =>
				data.type === ModalType.Redux.Types.INITIALIZE_MODAL,
		),
		mergeMap((action) => concat(of(ModalActions.SetModalData(action.payload)), of(ModalActions.ShowModal()))),
	);

export default combineEpics(onModalInitialize);
