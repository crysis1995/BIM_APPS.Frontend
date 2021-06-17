import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../components/Modal/type';

export function HandleError() {
	return catchError((err: Error) => {
		console.error(err.message);
		return of(
			ModalActions.InitializeModal({
				title: 'Błąd!',
				body: err.message,
				modalType: ModalType.Payload.EModalType.Error,
			}),
		);
	});
}