import { combineEpics } from 'redux-observable';
import { OnHandleFetchAccessToken } from './Handle.FetchAccessToken.Epic';
import { HandleTimerEpic } from './Handle.Timer.Epic';

export default combineEpics(OnHandleFetchAccessToken, HandleTimerEpic);
