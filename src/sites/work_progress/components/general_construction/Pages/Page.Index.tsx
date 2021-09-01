import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Viewer from '../../../../../components/ForgeViewer/components';
import { EApplicationsWithModules } from '../../../../types';
import ButtonGroupWithActions from '../Organisms/ButtonGroupWithActions';
import ElementContainer from '../Organisms/ElementContainer';



function PageIndex() {
	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Col className={'p-3'}>
						<Row className={'pb-3'}>
							<Col>
								<ButtonGroupWithActions />
							</Col>
						</Row>
						<Row>
							<Col>
								<ElementContainer />
							</Col>
						</Row>
					</Col>
				</div>
			</Col>
		</>
	);
}

export default PageIndex;
