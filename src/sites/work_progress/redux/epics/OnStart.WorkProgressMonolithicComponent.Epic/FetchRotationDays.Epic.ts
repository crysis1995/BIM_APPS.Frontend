import { from, merge, of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import { map, switchMap } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { GetProjectRotationDaysType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetProjectRotationDays';

export function FetchRotationDaysEpic(GRAPHQL: GraphQLAPIService, project: string) {
	return merge(
		of(GeneralActions.FetchRotationDaysStart()),
		from(GRAPHQL.MONOLITHIC.CountProjectRotationDays({ project_id: project })).pipe(
			switchMap((data) => {
				const N = 500;
				const numObjects = data.warbudProjectRotationDaysConnection.aggregate.count;
				let arrayOfPRomises: Promise<GetProjectRotationDaysType.Response['warbudProjectRotationDays']>[] = [];
				for (let index = 0; index < Math.ceil(numObjects / N); index++) {
					arrayOfPRomises.push(
						GRAPHQL.MONOLITHIC.GetProjectRotationDays({
							project_id: project,
							start: index * N,
						}).then((x) => x.warbudProjectRotationDays),
					);
				}
				return from(Promise.all(arrayOfPRomises)).pipe(
					map((data) => data.flatMap((x) => x)),
					map((response) => GeneralActions.FetchRotationDaysEnd(response)),
					// HandleError(),
				);
			}),
			// HandleError(),
		),
	);
}
