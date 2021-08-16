import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import React from 'react';
import OtherWorksHeaderComponent from './OtherWorksHeaderComponent';
import OtherWorksCollapsedBodyComponent from './OtherWorksCollapsedBodyComponent';

type componentProps = {
	setActualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
	option: OTHER_WORK_TYPE;
	eventKey: string;
};

function OtherWorksRowComponent(props: componentProps) {
	return (
		<>
			<OtherWorksHeaderComponent
				eventKey={props.eventKey}
				actualAccordion={props.setActualAccordion}
				actualAccordion1={props.actualAccordion}
				value={props.option}
			/>
			<OtherWorksCollapsedBodyComponent
				option={props.option}
				eventKey={props.eventKey}
				actualAccordion={props.actualAccordion}
			/>
		</>
	);
}

export default OtherWorksRowComponent;
