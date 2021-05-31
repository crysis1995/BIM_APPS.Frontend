import React from 'react';
import { TranslationsUnion } from './ITranslation';
import { Lang } from './Lang';
import LocaleNameEngine from './LocaleName.Core';

type Props = {
	value: TranslationsUnion;
	lang?: Lang;
};

const LocaleNameComponent: React.FunctionComponent<Props> = ({ value, lang = Lang.PL }) => {
	const translatedName = LocaleNameEngine({ value, lang });
	return <>{translatedName}</>;
};

export default LocaleNameComponent;
