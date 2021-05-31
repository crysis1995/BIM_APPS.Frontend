import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { ActualEventKeyAwareRowComponent } from './Utils/ActualEventKeyAwareRowComponent';
import { ArrowIcon } from './Utils/ArrowIcon';
import { EDirection } from '../types/EDirection';
import LocaleNameComponent from '../../../../../../../../localisation/LocaleNameComponent';
import React from 'react';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { connect } from 'react-redux';

type ComponentProps = {
	eventKey: string;
	actualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion1: string | null;
	value: OTHER_WORK_TYPE;
};

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: ComponentProps,
) => ({
	summaryWorkedTime: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences
		? Object.values(state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences)
				.filter((e) => e.work_type === componentProps.value)
				.reduce((previousValue, currentValue) => previousValue + currentValue.worked_time, 0)
		: 0,
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
