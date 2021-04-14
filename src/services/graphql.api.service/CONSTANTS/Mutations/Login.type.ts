export namespace LoginType {
	export type Response = Login;
	export type Request = { name: string; password: string };
	export interface Login {
		login: LoginData;
	}

	export interface LoginData {
		jwt: string;
		user: User;
	}

	export interface User {
		id: string;
	}
}
