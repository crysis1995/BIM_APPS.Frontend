class StorageService {
	private storage: Storage;
	constructor() {
		this.storage = window.localStorage;
	}
	public clear(key: StorageKeys) {
		this.storage.removeItem(key);
	}

	public get<T>(key: StorageKeys): T | null {
		const data = this.storage.getItem(key);
		return data ? JSON.parse(data) : null;
	}

	public set(key: StorageKeys, value: any): void {
		this.storage.setItem(key, JSON.stringify(value));
	}
}

export default new StorageService();

export enum StorageKeys {
	Credentials = 'credentials',
	ShouldCache = 'shouldCache',
}
