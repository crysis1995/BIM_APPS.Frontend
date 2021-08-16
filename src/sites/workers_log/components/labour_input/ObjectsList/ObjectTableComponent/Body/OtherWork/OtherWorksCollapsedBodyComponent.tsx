import AddOtherWorksInputCollapseComponent from './AddOtherWorksInputCollapseComponent';
import React from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { v4 } from 'uuid';
import OtherWorksCollapseComponent from './OtherWorksCollapseComponent';
import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';

type componentProps = {
	eventKey: string;
	actualAccordion: string | null;
	option: OTHER_WORK_TYPE;
};

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: componentProps,
) => ({
	otherWorks: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences
		? Object.values(state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences)
				.filter((e) => e && e.work_type === componentProps.option)
				.map((e) => e.id)
		: [],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function OtherWorksCollapsedBodyComponent(props: Props) {
	return (
		<>
			{props.otherWorks.map((otherWorkId) => (
				<OtherWorksCollapseComponent
					key={v4()}
					workID={otherWorkId}
					eventKey={props.eventKey}
					actualAccordion={props.actualAccordion}
				/>
			))}
			<AddOtherWorksInputCollapseComponent
				option={props.option}
				eventKey={props.eventKey}
				actualAccordion={props.actualAccordion}
			/>
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherWorksCollapsedBodyComponent);
