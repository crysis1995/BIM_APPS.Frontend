import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';

export namespace AutodeskLogin {
	export namespace Payload {
		export interface Login2LeggedPayload {
			access_token: string;
			expires_in: number;
		}
		export interface Login3LeggedPayload {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		}
	}
	export namespace Redux {
		export interface Store {
			login_2_legged: AutodeskLogin.Payload.Login2LeggedPayload | null;
			login_3_legged: AutodeskLogin.Payload.Login3LeggedPayload | null;
			isLogin: boolean;
		}
		export interface IActions {
			Login2Legged: (
				data: AutodeskLogin.Payload.Login2LeggedPayload,
			) => {
				type: typeof Types.LOGIN_2_LEGGED;
				payload: typeof data;
			};

			Login3Legged: (
				data: AutodeskLogin.Payload.Login3LeggedPayload,
			) => {
				type: typeof Types.LOGIN_3_LEGGED;
				payload: typeof data;
			};

			Logout3Legged: () => {
				type: typeof Types.LOGOUT_3_LEGGED;
			};

			HandleFetchAccessToken: () => {
				type: typeof Types.HANDLE_FETCH_ACCESS_TOKEN;
			};
		}
		export type Actions = ReturnTypeFromInterface<IActions>;
		export enum Types {
			LOGIN_2_LEGGED = 'autodesk__LOGIN_2_LEGGED',
			LOGIN_3_LEGGED = 'autodesk__LOGIN_3_LEGGED',
			LOGOUT_3_LEGGED = 'autodesk__LOGOUT_3_LEGGED',
			HANDLE_FETCH_ACCESS_TOKEN = 'autodesk__HANDLE_FETCH_ACCESS_TOKEN',
		}
	}
}
