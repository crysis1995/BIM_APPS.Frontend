import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Viewer from '../../../../components/ForgeViewer/components';
import MonolithicInputs from './Monolithic.Inputs';
import { connect } from 'react-redux';
import GeneralActions from '../../redux/monolithic/general/actions';
import MonolithicTabs from './Monolithic.Tabs';
import MonolithicResults from './Monolithic.Results';
import MonolithicSelectedElementsSummary from './Monolithic.SelectedElementsSummary';
import { EApplicationsWithModules } from '../../../types';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
	ComponentStart: GeneralActions.ComponentStart,
	ComponentEnd: GeneralActions.ComponentEnd,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function MonolithicLayoutComponent(props: Props) {
	useEffect(() => {
		props.ComponentStart();
		return () => {
			props.ComponentEnd();
		};
	}, []);
	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Col className="p-3">
						<MonolithicInputs />
						<MonolithicTabs />
						<MonolithicResults />
						<MonolithicSelectedElementsSummary />
					</Col>
				</div>
			</Col>
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(MonolithicLayoutComponent);
