import React from 'react';
import { RootState } from '../../../../../../../store';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import ComponentSelectedElementPropsSummary from './Component.SelectedElementPropsSummary';
import StatusFormInput from './Component.StatusFormInput';
import { DayFormInput } from './Component.DayFormInput';
import { GetObjectsByLevelType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

type ComponentProps = {
	setStatus: (data: GetObjectsByLevelType.StatusEnum | null) => void;
	status: GetObjectsByLevelType.StatusEnum | null;
	date: string;
	setDate: (date: string) => void;
};

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ComponentModalBody(props: Props) {
	return (
		<Row>
			<Col>
				<Row>
					<ComponentSelectedElementPropsSummary />
				</Row>
				<hr />
				<Row>
					<Col xs={6}>
						<StatusFormInput status={props.status} setStatus={props.setStatus} />
					</Col>
					<Col xs={6}>
						<DayFormInput date={props.date} setDate={props.setDate} />
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentModalBody);
