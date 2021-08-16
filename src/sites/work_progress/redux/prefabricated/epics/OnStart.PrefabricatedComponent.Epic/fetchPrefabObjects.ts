import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { from, merge, of } from 'rxjs';
import PrefabricatedObjectsActions from '../../objects/actions';
import { map, switchMap } from 'rxjs/operators';
import { GetPrefabricatedObjectsType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';

export function FetchPrefabObjects(GRAPHQL: GraphQLAPIService, project: string) {
	return merge(
		of(PrefabricatedObjectsActions.FetchObjectsStart()),
		from(GRAPHQL.WorkProgress.Prefabricated.AcceptanceObjects.Count({ project })).pipe(
			switchMap((data) => {
				const N = 500;
				const numObjects = data.acceptanceObjectsConnection.aggregate.count;
				let arrayOfPRomises: Promise<GetPrefabricatedObjectsType.Response['acceptanceObjects']>[] = [];
				for (let index = 0; index < Math.ceil(numObjects / N); index++) {
					arrayOfPRomises.push(
						GRAPHQL.WorkProgress.Prefabricated.AcceptanceObjects.Get({
							project,
							start: index * N,
							limit: N,
						}).then((x) => x.acceptanceObjects),
					);
				}
				return from(Promise.all(arrayOfPRomises)).pipe(
					map((data) => data.flatMap((x) => x)),
					map((response) => PrefabricatedObjectsActions.FetchObjectsEnd(response)),
				);
			}),
		),
	);
}