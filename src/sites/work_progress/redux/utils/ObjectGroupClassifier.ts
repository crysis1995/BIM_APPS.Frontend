import { RoundNumber } from '../../../../utils/RoundNumber';
import { Constants } from '../constants';
import { GetObjectsByLevelType } from '../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

function Sum(data: Array<number>) {
	return RoundNumber(data.reduce((previousValue, currentValue) => previousValue + currentValue, 0));
}

export type ClassifierSettings = { [key in ClassifierGroupEnum]: ClassifierSettingsItem };

export interface ClassifierSettingsItem {
	name: ClassifierGroupEnum;
	parameters: {
		[key in ObjectParams]?: typeof Sum;
	};
	conditions: {
		keys: Constants.ClassificationDefinitions[];
	};
}

export enum ClassifierGroupEnum {
	Wall = 'wall',
	Column = 'column',
	Beam = 'beam',
	Foundation = 'foundation',
	Floor = 'floor',
	Other = 'other',
}

export type ObjectParams = keyof Pick<GetObjectsByLevelType.AcceptanceObject, 'area' | 'volume' | 'running_meter'>;

export class Classifier {
	public static _classifier: ClassifierSettings = {
		[ClassifierGroupEnum.Wall]: {
			name: ClassifierGroupEnum.Wall,
			parameters: {
				volume: Sum,
				area: Sum,
				running_meter: Sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					Constants.ClassificationDefinitions.ExternalWall,
					Constants.ClassificationDefinitions.InternalWall,
					Constants.ClassificationDefinitions.CurveWall,
					Constants.ClassificationDefinitions.FoundationWall,
					Constants.ClassificationDefinitions.HighWall,
					Constants.ClassificationDefinitions.OneSideWall,
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.ScianaMonolityczna,
					Constants.ClassificationDefinitions.ScianaZewnetrzna,
					Constants.ClassificationDefinitions.ScianaWewnetrzna,
					Constants.ClassificationDefinitions.ScianaWysoka,
					Constants.ClassificationDefinitions.ScianaPrefabrykowana,
					Constants.ClassificationDefinitions.ScianaPref,
					Constants.ClassificationDefinitions.ScianaOporowa,
					Constants.ClassificationDefinitions.ScianaDociskowa,
					Constants.ClassificationDefinitions.ScianaLukowa,
					Constants.ClassificationDefinitions.ScianaFundamentowa,
					Constants.ClassificationDefinitions.ScianaBetArch,
					Constants.ClassificationDefinitions.ScianaAkustyczna,
					Constants.ClassificationDefinitions.ScianaMurowana,
					Constants.ClassificationDefinitions.ScianaSzczelinowa,
					Constants.ClassificationDefinitions.ScianaPodstropowa,
					Constants.ClassificationDefinitions.ScianaWSystemieScp,
					Constants.ClassificationDefinitions.ScianaSzybuWindowego,
					Constants.ClassificationDefinitions.SciankaFundamentowa,
					Constants.ClassificationDefinitions.Filar,
					Constants.ClassificationDefinitions.ScianyPrzeglebienia,
				],
			},
		},
		[ClassifierGroupEnum.Column]: {
			// element_type: ELEMENT_TYPE.V,
			name: ClassifierGroupEnum.Column,
			parameters: {
				volume: Sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					Constants.ClassificationDefinitions.RectangularHighColumn,
					Constants.ClassificationDefinitions.RectangularColumn,
					Constants.ClassificationDefinitions.SpecificColumn,
					Constants.ClassificationDefinitions.Pilaster,
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.SlupProstokatny,
					Constants.ClassificationDefinitions.SlupOkragly,
					Constants.ClassificationDefinitions.SlupWysoki,
					Constants.ClassificationDefinitions.SlupWysokiProstokatny,
					Constants.ClassificationDefinitions.SlupWysokiOkragly,
					Constants.ClassificationDefinitions.SlupPrefabrykowany,
					Constants.ClassificationDefinitions.SlupPref,
					Constants.ClassificationDefinitions.SlupSkosny,
					Constants.ClassificationDefinitions.SlupSpecyficzny,
					Constants.ClassificationDefinitions.SlupPodstropowy,
				],
			},
		},
		[ClassifierGroupEnum.Beam]: {
			// element_type: ELEMENT_TYPE.H,
			name: ClassifierGroupEnum.Beam,
			parameters: {
				volume: Sum,
				running_meter: Sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					Constants.ClassificationDefinitions.CastInSituBeam,
					Constants.ClassificationDefinitions.ParticularBeam,
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.BelkaMonolityczna,
					Constants.ClassificationDefinitions.BelkaPrefabrykowana,
					Constants.ClassificationDefinitions.BelkaPref,
					Constants.ClassificationDefinitions.BelkaObwodowa,
					Constants.ClassificationDefinitions.BelkaObwodowaPref,
					Constants.ClassificationDefinitions.BelkaKrawedziowa,
					Constants.ClassificationDefinitions.BelkaKrawedziowaPref,
					Constants.ClassificationDefinitions.Nadciag,
					Constants.ClassificationDefinitions.Podciag,
					Constants.ClassificationDefinitions.Wieniec,
				],
			},
		},
		[ClassifierGroupEnum.Foundation]: {
			// element_type: ELEMENT_TYPE.H,
			name: ClassifierGroupEnum.Foundation,
			parameters: {
				volume: Sum,
				running_meter: Sum,
			},
			conditions: {
				keys: [
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.StopaFundamentowa,
					Constants.ClassificationDefinitions.LawaFundamentowa,
					Constants.ClassificationDefinitions.PlytaFundamentowa,
					Constants.ClassificationDefinitions.PosadzkaBetonowa,
					Constants.ClassificationDefinitions.Posadzka,
					Constants.ClassificationDefinitions.ChudyBeton,
					Constants.ClassificationDefinitions.Barety,
					Constants.ClassificationDefinitions.FundamentyPodUrzadzenia,
					Constants.ClassificationDefinitions.UskokLawy,
					Constants.ClassificationDefinitions.LawaPochyla,
					Constants.ClassificationDefinitions.Fundament,
				],
			},
		},
		[ClassifierGroupEnum.Floor]: {
			// element_type: ELEMENT_TYPE.H,
			name: ClassifierGroupEnum.Floor,
			parameters: {
				volume: Sum,
				area: Sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					Constants.ClassificationDefinitions.CastInSituSlab,
					Constants.ClassificationDefinitions.ConsoleCourte,
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.StropMonolityczny,
					Constants.ClassificationDefinitions.StropFiligran,
					Constants.ClassificationDefinitions.Nadbeton,
					Constants.ClassificationDefinitions.StropPrefabrykowany,
					Constants.ClassificationDefinitions.StropPref,
					Constants.ClassificationDefinitions.StropPrefHc,
					Constants.ClassificationDefinitions.StropSprezony,
					Constants.ClassificationDefinitions.Kompensacja,
					Constants.ClassificationDefinitions.StropTransferowy,
					Constants.ClassificationDefinitions.Glowica,
					Constants.ClassificationDefinitions.PlytaRampy,
					Constants.ClassificationDefinitions.RampaProsta,
					Constants.ClassificationDefinitions.RampaSpiralna,
					Constants.ClassificationDefinitions.StropNaGruncie,
					Constants.ClassificationDefinitions.StropPochyly,
					Constants.ClassificationDefinitions.StropHC,
				],
			},
		},
		[ClassifierGroupEnum.Other]: {
			name: ClassifierGroupEnum.Other,
			parameters: {
				volume: Sum,
				running_meter: Sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					Constants.ClassificationDefinitions.BeamKeyway,
					/*METODOLOGIA KLASYFIKACJA*/
					Constants.ClassificationDefinitions.Attyka,
					Constants.ClassificationDefinitions.Acroterion,
					Constants.ClassificationDefinitions.SchodyMonolityczne,
					Constants.ClassificationDefinitions.SchodyPrefabrykowane,
					Constants.ClassificationDefinitions.Spocznik,
					Constants.ClassificationDefinitions.BiegSchodowyPref,
					Constants.ClassificationDefinitions.Podwalina,
					Constants.ClassificationDefinitions.PodwalinaPref,
					Constants.ClassificationDefinitions.CokolSlupaPref,
					Constants.ClassificationDefinitions.TrzpienZelbetowy,
					Constants.ClassificationDefinitions.Wyburzenia,
					Constants.ClassificationDefinitions.RusztMonolityczny,
				],
			},
		},
	};
	static CheckValue(value: string | null) {
		if (value) {
			const filtered = Object.values(Classifier._classifier).filter((x) =>
				x.conditions.keys.includes(value as Constants.ClassificationDefinitions),
			);
			if (filtered.length > 0) return filtered[0];
		}

		return null;
	}
}
