import React from 'react';
import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { v4 } from 'uuid';
import OtherWorksRowComponent from './OtherWorks.Row.Component';

export default function OtherWorksListComponent({
	setActualAccordion,
	actualAccordion,
}: {
	setActualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
}) {
	const options = Object.values(OTHER_WORK_TYPE);
	return (
		<>
			{options.map((option) => (
				<OtherWorksRowComponent
					key={v4()}
					eventKey={option}
					option={option}
					setActualAccordion={setActualAccordion}
					actualAccordion={actualAccordion}
				/>
			))}
		</>
	);
}
