import Api from '../services/api.service';
import StorageService from '../services/storage.service';
import { createEpicMiddleware } from 'redux-observable';
import { RootActions } from './_types/RootActions';
import { RootState } from './_types/RootState';
import { RootDependencies } from './_types/RootDependencies';
import CacheService from '../services/cache.service';
import LoggerService from '../services/logger.service';

export const dependencies = {
	api: Api,
	storage: StorageService,
	cache: CacheService,
	logger: LoggerService,
};
export const epicMiddleware = createEpicMiddleware<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
>({ dependencies });
