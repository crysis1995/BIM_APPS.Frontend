export type Level = {
	name: string;
};

export type Crane = {
	name: string;
};

export type Causes = {
	id: string;
};

export interface User {
	email: string;
}

export type DelayCauseResponse = {
	id: string;
	commentary: string;
	level: Level;
	crane: Crane;
	user: User;
	date?: any;
	created_at: string;
	causes: Causes[];
};
