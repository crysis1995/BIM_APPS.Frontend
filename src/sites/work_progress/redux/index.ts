import { combineReducers } from 'redux';
import Monolithic from './monolithic';

import { combineEpics } from 'redux-observable';
import { OnStartWorkProgressMonolithicComponent } from './epics/OnStart.WorkProgressMonolithicComponent.Epic';
import { OnChangeLevelAndSetSheetsEpic } from './epics/OnChange.LevelAndSetSheets.Epic';
import { OnIncrementRotationDayEpic } from './epics/OnIncrement.RotationDay.Epic';
import { OnDecrementRotationDayEpic } from './epics/OnDecrement.RotationDay.Epic';
import { OnInvokeHandleSetCurrentElementEpic } from './epics/OnInvoke.HandleSetCurrentElement.Epic';
import { OnChangeLevelOrDateEpic } from './epics/OnChage.LevelOrDate.Epic';
import { OnChangeLevelEpic } from './epics/OnChange.Level.Epic';
import { OnInvokeTrySetRotationDay } from './epics/OnInvoke.TrySetRotationDay.Epic';
import { OnInvokeTrySetDate } from './epics/OnInvoke.TrySetDate.Epic';
import { OnChangeSelectElementsEpic } from './epics/OnChange.SelectElements.Epic';
import { OnEndWorkProgressMonolithicComponent } from './epics/OnEnd.WorkProgressMonolithicComponent.Epic';
import { OnInvokeSetStatusesInitEpic } from './epics/OnInvoke.SetStatusesInit.Epic';
import { OnStartUpdateTermEpic } from './epics/OnStart.UpdateTerm.Epic';
import { OnInvokeCheckObjectsGroupTermsEpic } from './epics/OnInvoke.CheckObjectsGroupTerms.Epic';
import { HandleCleanSelectedElements } from './epics/Handle.CleanSelectedElements.Epic';

import Prefabricated from './prefabricated';
import GeneralConstruction from './general_construction';
import { RootActions } from '../../../state/types/RootActions';
import { RootState } from '../../../state';

export default {
	reducer: combineReducers({
		// General: General.reducer,
		Monolithic: Monolithic.reducer,
		Prefabricated: Prefabricated.reducer,
		GeneralConstruction:GeneralConstruction.reducer
	}),
	epics: combineEpics<RootActions, RootActions, RootState>(
		OnStartWorkProgressMonolithicComponent,
		OnIncrementRotationDayEpic,
		OnDecrementRotationDayEpic,
		OnChangeLevelOrDateEpic,
		OnChangeLevelAndSetSheetsEpic,
		OnInvokeHandleSetCurrentElementEpic,
		OnChangeLevelEpic,
		OnInvokeTrySetRotationDay,
		OnInvokeTrySetDate,
		OnChangeSelectElementsEpic,
		OnEndWorkProgressMonolithicComponent,
		OnInvokeSetStatusesInitEpic,
		OnStartUpdateTermEpic,
		OnInvokeCheckObjectsGroupTermsEpic,
		HandleCleanSelectedElements,
		Prefabricated.epics,
		GeneralConstruction.epics,
	),
};
