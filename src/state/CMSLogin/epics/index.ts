import { combineEpics } from 'redux-observable';
import { HandleUpdateTokenEpic } from './Handle.UpdateToken.Epic';
import { HandleUserLoginEpic } from './Handle.UserLogin.Epic';
import { HandleLogoutEpic } from './Handle.Logout.Epic';
import { HandleSetUserDataEpic } from './Handle.SetUserData.Epic';
import { OnStartLoginComponentEpic } from './OnStart.LoginComponent.Epic';
import { HandleUserFetchDataStartEpic } from './Handle.UserFetchDataStart.Epic';
import { HandleUserFetchClaimsEpic } from './Handle.UserFetchClaims.Epic';
import { OnFetchUserStartEpic } from './On.FetchUserStart.Epic';

export default combineEpics(
	HandleLogoutEpic,
	HandleUpdateTokenEpic,
	HandleUserLoginEpic,
	HandleSetUserDataEpic,
	OnStartLoginComponentEpic,
	HandleUserFetchDataStartEpic,
	HandleUserFetchClaimsEpic,
	OnFetchUserStartEpic,
);
