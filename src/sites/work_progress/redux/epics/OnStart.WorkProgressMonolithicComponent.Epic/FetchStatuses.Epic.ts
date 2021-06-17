import { from, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import GeneralActions from '../../monolithic/general/actions';
import normalize from '../../../../../utils/Normalize';
import { HandleError } from '../HandleError.Epic';

export function FetchStatusesEpic(GRAPHQL: GraphQLAPIService) {
	return merge(
		of(GeneralActions.FetchStatusesStart()),
		from(GRAPHQL.MONOLITHIC.Status.Get()).pipe(
			map((value) => GeneralActions.FetchStatusesEnd(normalize(value, 'id'))),
			// HandleError(),
		),
	);
}
