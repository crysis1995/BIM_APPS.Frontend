import { filter } from 'rxjs/operators';
import { RootActions } from '../../state/_types/RootActions';

function FilterType<T extends (...args:any) => RootActions>(
	type: ReturnType<T>['type'],
) {
	return filter<RootActions>(
		(data): data is ReturnType<T> => data.type === type,
	);
}

export default FilterType;