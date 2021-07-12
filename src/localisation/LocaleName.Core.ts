import { TranslationsUnion } from './ITranslation';
import { Lang } from './Lang';
import { TRANSLATIONS } from './Translations';

export default function LocaleNameCore ({ value, lang = Lang.PL }: { value: TranslationsUnion; lang?: Lang }) {
	const translationObject = TRANSLATIONS[lang];
	if (translationObject) {
		return translationObject[value];
	} else return value;
}
