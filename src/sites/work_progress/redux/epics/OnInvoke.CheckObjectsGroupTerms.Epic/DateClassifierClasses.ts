import dayjs, { Dayjs } from 'dayjs';
import { GetAllAcceptanceTermsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { FormatType, GetFormattedDate } from '../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';

export class FinishUpdateIsNeeded {
	private readonly _objectsCount: number;
	private readonly _finishedID: string;
	private _countFinishedStatuses = 0;
	private _date: Dayjs | undefined;
	private _term: GetAllAcceptanceTermsType.AcceptanceTerm;
	private updating = true;

	constructor(objectsCount: number, finishedID: string, term: GetAllAcceptanceTermsType.AcceptanceTerm) {
		this._objectsCount = objectsCount;
		this._finishedID = finishedID;
		this._term = term;
	}

	qualifiedStatus(item: GetObjectsByLevelType.AcceptanceObject) {
		if (this.updating) {
			const finishedStatus = item.statuses.find((x) => x.status.id === this._finishedID);
			if (finishedStatus) {
				this._countFinishedStatuses++;
				const currentDate = dayjs(finishedStatus.date);
				if (!this._date || currentDate.isAfter(this._date)) {
					this._date = currentDate;
				}
			}
		}
	}

	get date() {
		if (this._date) return GetFormattedDate(this._date, FormatType.Day);
	}

	isQualifiedToUpdate() {
		console.log(this._objectsCount);
		console.log(this._countFinishedStatuses);
		return this._objectsCount === this._countFinishedStatuses;
	}

	isNeedToUpdate() {
		this.updating = this._term.REAL_FINISH === null;
	}
}

export class StartUpdateIsNeeded {
	private readonly _objectsCount: number;
	private readonly _finishedID: string;
	private _date: Dayjs | undefined;
	private _qualifiedToUpdate = false;
	private _term: GetAllAcceptanceTermsType.AcceptanceTerm;
	private updating = true;

	constructor(objectsCount: number, finishedID: string, term: GetAllAcceptanceTermsType.AcceptanceTerm) {
		this._objectsCount = objectsCount;
		this._finishedID = finishedID;
		this._term = term;
	}

	qualifiedStatus(item: GetObjectsByLevelType.AcceptanceObject) {
		if (this.updating) {
			if (item.statuses.length > 0) {
				this._qualifiedToUpdate = true;
				item.statuses.forEach((status) => {
					const currentDate = dayjs(status.date);
					if (!this._date || currentDate.isBefore(this._date)) this._date = currentDate;
				});
			}
		}
	}

	get date() {
		if (this._date) return GetFormattedDate(this._date, FormatType.Day);
	}

	isQualifiedToUpdate() {
		return this._qualifiedToUpdate;
	}

	isNeedToUpdate() {
		this.updating = this._term.REAL_START === null;
	}
}