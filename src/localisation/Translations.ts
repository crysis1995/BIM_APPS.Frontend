import { ITranslation } from './ITranslation';
import PL from './pl';
import { Lang } from './Lang';

export const TRANSLATIONS: { [key in Lang]?: ITranslation } = {
	[Lang.PL]: PL,
};
