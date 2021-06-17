import { from, merge, of } from 'rxjs';
import TermsActions from '../../monolithic/terms/actions';
import { map, switchMap } from 'rxjs/operators';
import RestAPIService from '../../../../../services/rest.api.service';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { GetAllAcceptanceTermsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';

export function FetchTermsEpic(REST: RestAPIService, GRAPHQL: GraphQLAPIService, project: string) {
	return merge(
		of(TermsActions.FetchStart()),
		from(REST.MONOLITHIC.initializeTerms(project)).pipe(
			switchMap(() =>
				from(GRAPHQL.MONOLITHIC.Term.Count({ project_id: project })).pipe(
					switchMap((data) => {
						const N = 100;
						const numObjects = data.acceptanceTermsConnection.aggregate.count;
						let arrayOfPRomises: Promise<GetAllAcceptanceTermsType.Response>[] = [];
						for (let index = 0; index < Math.ceil(numObjects / N); index++) {
							arrayOfPRomises.push(
								GRAPHQL.MONOLITHIC.Term.Get({
									project_id: project,
									start: index * N,
									limit: N,
								}),
							);
						}
						return from(Promise.all(arrayOfPRomises)).pipe(
							map((data) => data.flatMap((x) => x.acceptanceTerms)),
							map((data) => TermsActions.FetchEnd(data)),
							// HandleError(),
						);
					}),
					// HandleError(),
				),
			),
			// HandleError(),
		),
	);
}
