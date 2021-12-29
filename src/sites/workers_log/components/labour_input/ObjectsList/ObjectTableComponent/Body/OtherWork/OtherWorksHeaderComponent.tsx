import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { ActualEventKeyAwareRowComponent } from './Utils/ActualEventKeyAwareRowComponent';
import { ArrowIcon } from './Utils/ArrowIcon';
import { EDirection } from '../types/EDirection';
import LocaleNameComponent from '../../../../../../../../localisation/LocaleNameComponent';
import React from 'react';
import { connect } from 'react-redux';

import { summaryOtherWorkWorkedTimeSelector } from './Selector.SummaryOtherWorkWorkedTime';
import { RootState } from '../../../../../../../../state';

type ComponentProps = {
	eventKey: string;
	actualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion1: string | null;
	value: OTHER_WORK_TYPE;
};

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	summaryWorkedTime: summaryOtherWorkWorkedTimeSelector(state, componentProps),
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function OtherWorksHeaderComponent(props: Props) {
	return (
		<ActualEventKeyAwareRowComponent eventKey={props.eventKey} setActualAccordion={props.actualAccordion}>
			<th colSpan={3}>
				<ArrowIcon direction={props.actualAccordion1 === props.eventKey ? EDirection.Down : EDirection.Up} />
				<span className={'ml-2'}>
					<LocaleNameComponent value={props.value} />
				</span>
			</th>
			<th>{props.summaryWorkedTime}</th>
		</ActualEventKeyAwareRowComponent>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherWorksHeaderComponent);
