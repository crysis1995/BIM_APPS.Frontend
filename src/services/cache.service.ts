import Dexie from 'dexie';
import { CommentaryElement, Element, Project, UserPayload } from '../generated/graphql';

const WSPRO_DB_NAME = 'WSProCache';

interface ICacheService {
	IsAvailable(): Promise<boolean>;
	projects: Dexie.Table<Project, Project['id']>;
	elements: Dexie.Table<Element, Element['id']>;
	commentaryElements: Dexie.Table<CommentaryElement, CommentaryElement['id']>;
	users: Dexie.Table<UserPayload, UserPayload['id']>;
}

class CacheService extends Dexie implements ICacheService {
	public projects!: Dexie.Table<Project, Project['id']>;
	public elements!: Dexie.Table<Element, Element['id']>;
	public commentaryElements!: Dexie.Table<CommentaryElement, CommentaryElement['id']>;
	public users!: Dexie.Table<UserPayload, UserPayload['id']>;

	constructor() {
		super(WSPRO_DB_NAME);
		this.version(2).stores({
			projects: 'id,updatedAt',
			elements: 'id,updatedAt,projectId',
			commentaryElements: 'id,updatedAt,elementId',
			users: 'id',
		});
	}

	async IsAvailable(): Promise<boolean> {
		try {
			return await Dexie.exists(WSPRO_DB_NAME);
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}

export default new CacheService();
