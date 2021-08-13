import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { from, merge, of } from 'rxjs';
import PrefabricatedObjectsActions from '../../objects/actions';
import { map, switchMap } from 'rxjs/operators';
import { GetPrefabObjectsStatusesType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjectsStatuses';

export function FetchPrefabObjectStatuses(
	GRAPHQL: GraphQLAPIService,
	project: string,
	lastUpdated: string = '2020-01-01',
) {
	return merge(
		of(PrefabricatedObjectsActions.FetchStatusesStart()),
		from(GRAPHQL.WorkProgress.Prefabricated.AcceptanceObjectStatuses.Count({ project, lastUpdated })).pipe(
			switchMap((data) => {
				const N = 500;
				const numObjects = data.acceptanceObjectStatusesConnection.aggregate.count;
				let arrayOfPRomises: Promise<GetPrefabObjectsStatusesType.Response['acceptanceObjectStatuses']>[] = [];
				for (let index = 0; index < Math.ceil(numObjects / N); index++) {
					arrayOfPRomises.push(
						GRAPHQL.WorkProgress.Prefabricated.AcceptanceObjectStatuses.Get({
							project,
							start: index * N,
							limit: N,
							lastUpdated: lastUpdated,
						}).then((x) => x.acceptanceObjectStatuses),
					);
				}
				return from(Promise.all(arrayOfPRomises)).pipe(
					map((data) => data.flatMap((x) => x)),
					map((response) => PrefabricatedObjectsActions.FetchStatusesEnd(response)),
				);
			}),
		),
	);
}
