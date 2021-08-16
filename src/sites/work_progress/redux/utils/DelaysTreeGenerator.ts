import { GetAllDelacCausesType } from '../../../../services/graphql.api.service/CONSTANTS/Queries/GetAllDelayCauses';
import WorkProgress from '../../types';

export class DelaysTreeGenerator {
	private _delays: GetAllDelacCausesType.AcceptanceDelayCause[];
	constructor(delays: GetAllDelacCausesType.AcceptanceDelayCause[]) {
		this._delays = delays;
	}

	public generate() {
		if (this._delays.length === 0) return [];
		else
			return this._delays
				.filter((item) => item.is_main)
				.reduce<WorkProgress.Monolithic.Delays.Payload.DelaysTreeOutput[]>((previousValue, currentValue) => {
					previousValue.push(this.extract(currentValue));
					return previousValue;
				}, []);
	}

	private extract(
		item: GetAllDelacCausesType.AcceptanceDelayCause,
	): WorkProgress.Monolithic.Delays.Payload.DelaysTreeOutput {
		return {
			id: item.id,
			label: item.name,
			children: this.getParentChildren(item.id),
		};
	}

	private getParentChildren(parent_id: string): WorkProgress.Monolithic.Delays.Payload.DelaysTreeOutput[] | null {
		const sameParentDelays = this._delays.filter((e) => e.parent?.id === parent_id);
		if (sameParentDelays.length > 0) return sameParentDelays.map((e) => this.extract(e));
		else return null;
	}
}
