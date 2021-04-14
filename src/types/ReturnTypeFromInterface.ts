export type ReturnTypeFromInterface<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never;
}[keyof T];