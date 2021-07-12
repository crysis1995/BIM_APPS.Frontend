import { from, merge, of } from 'rxjs';
import LabourInputGeneralActions from '../../general/actions';
import { RootState } from '../../../../../../store';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { mergeMap } from 'rxjs/operators';
import normalize from '../../../../../../utils/Normalize';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../../components/Modal/type';

export const FetchOtherWorkOptions = (state: RootState, GRAPHQL: GraphQLAPIService) => {
	return merge(
		of(LabourInputGeneralActions.FetchOtherWorksStart()),
		from(GRAPHQL.WorkersLog.LabourInput.OtherWorkOptions.GetAll()).pipe(
			mergeMap((response) => {
				try {
					const data = normalize(response.workersLogOtherWorksOptions, 'id');
					return of(LabourInputGeneralActions.FetchOtherWorksEnd(data));
				} catch (e) {
					console.log(e);
					return of(
						ModalActions.InitializeModal({
							title: 'Uwaga!',
							modalType: ModalType.Payload.EModalType.Error,
							body: 'Nie udało się załadować opcji pozostałych prac budowlanych',
						}),
					);
				}
			}),
		),
	);
};
