import { combineEpics } from 'redux-observable';
import { OnComponentEndEpic } from './On.ComponentEnd.Epic';
import { OnComponentStartEpic } from './On.ComponentStart.Epic';
import { OnFetchElementsStartEpic } from './On.FetchElementsStart.Epic';
import { OnFetchCommentsStartEpic } from './OnFetchCommentsStart.Epic';

export default combineEpics(OnComponentEndEpic, OnComponentStartEpic, OnFetchElementsStartEpic,OnFetchCommentsStartEpic);
