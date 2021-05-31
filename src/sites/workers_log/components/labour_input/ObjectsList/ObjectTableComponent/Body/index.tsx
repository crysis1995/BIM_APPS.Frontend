import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../redux';
import HideComponent from '../../../../../../../components/HideComponent';
import OtherWorks from './OtherWork';
import Objects from './Objects';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	objectsNotLoaded:
		!state.WorkersLog.LabourInput.Objects.AllObjects || !state.WorkersLog.LabourInput.General.OtherWorks,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function TableBodyComponent(props: Props) {
	const [actualAccordion, setActualAccordion] = useState<string | null>(null);
	return (
		<HideComponent when={props.objectsNotLoaded}>
			<tbody>
				<Objects setActualAccordion={setActualAccordion} actualAccordion={actualAccordion} />
				<OtherWorks setActualAccordion={setActualAccordion} actualAccordion={actualAccordion} />
			</tbody>
		</HideComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBodyComponent);

