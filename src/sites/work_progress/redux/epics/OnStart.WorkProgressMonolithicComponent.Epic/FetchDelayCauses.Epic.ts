import { from, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import WorkProgressMonolithicDelaysActions from '../../monolithic/delays/actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { HandleError } from '../HandleError.Epic';

export function FetchDelayCausesEpic(GRAPHQL: GraphQLAPIService) {
	return merge(
		of(WorkProgressMonolithicDelaysActions.FetchStart()),
		from(GRAPHQL.MONOLITHIC.DelayCauses.GetAll({})).pipe(
			map((data) => WorkProgressMonolithicDelaysActions.FetchEnd(data.acceptanceDelayCauses)),
			// HandleError()
		),
	);
}
