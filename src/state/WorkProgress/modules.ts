export default interface IWorkProgress<T>{
	General: T;
	Statuses: T;
	Elements: T;
}

export module asd {
	export const data = 'asdasd';
}

export module asd {
	export function defaultDataGetter() {
		return data;
	}
}

