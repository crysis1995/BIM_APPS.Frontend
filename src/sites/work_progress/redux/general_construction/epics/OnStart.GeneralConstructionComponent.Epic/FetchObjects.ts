import { EMPTY, from, merge, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import { QueryAcceptanceObjectsType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import GeneralConstructionObjectActions from '../../objects/actions';
import { map, mergeMap } from 'rxjs/operators';

export default function FetchObjects(GRAPHQL: GraphQLAPIService, project: CMSLoginType.Payload.ActualProject) {
	if (!project.params) return EMPTY;
	const standardParamKeys = project.params.map((value) => value.key).filter((x) => !!x) as string[];
	const isDetailsNeeded = project.params.some((value) => !value.key && value.description !== '');
	const data: QueryAcceptanceObjectsType.DataType = { details: isDetailsNeeded };
	(standardParamKeys as (keyof QueryAcceptanceObjectsType.DataType)[]).forEach((val) => {
		data[val] = true;
	});
	return merge(
		of(GeneralConstructionObjectActions.FetchObjectsStart()),
		from(GRAPHQL.MONOLITHIC.Objects.Count({ project_id: project.id })).pipe(
			mergeMap((itemsCount) =>
				from(
					FetchMany(
						itemsCount.acceptanceObjectsConnection.aggregate.count,
						(numb) =>
							GRAPHQL.WorkProgress.GeneralConstruction.AcceptanceObjects.Get({
								...data,
								project: project.id,
								...numb,
							}),
						(data1) => data1.acceptanceObjects,
						200,
					),
				).pipe(map((data) => GeneralConstructionObjectActions.FetchObjectsEnd(data))),
			),
		),
	);
}

function FetchMany<T, L>(
	count: number,
	fetchCallback: ({ start, limit }: { start: number; limit: number }) => Promise<T>,
	selector: (data: T) => L[],
	N = 500,
) {
	let promisesList: Promise<L[]>[] = [];
	for (let index = 0; index < Math.ceil(count / N); index++) {
		promisesList.push(fetchCallback({ limit: N, start: index * N }).then(selector));
	}
	return Promise.all(promisesList).then((data) => data.flatMap((x) => x));
}
