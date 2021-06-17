import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Loader from '../../../../components/Loader';
import { Table, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import Permissions from '../../../../components/Permissions';
import { MONOLITHIC } from '../../redux/types/constans';
import { parseDate } from '../../redux/utils/terms_utils';
function Log(props) {
	return (
		<Col xs={12} className="h-100">
			{/*{terms_loading ? (*/}
			{/*	<Loader height={'100px'} />*/}
			{/*) : (*/}
			{/*	<>*/}
			<div className={'py-4 text-center'}>
				<h6>Dziennki brygadzistkowski</h6>
			</div>
			<Table data-testid="ComponentTermsTable" size={'sm'}>
				<thead>
					<tr>
						<th>Grupa elementów</th>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Liczba przepracowanych godzin ekipy</Tooltip>}>
							<th>Liczba przepracowanych godzin ekipy</th>
						</OverlayTrigger>
					</tr>
				</thead>
				<tbody>
					{MONOLITHIC.WORKERS.map((worker) => (
						<tr key={v4()}>
							<td>{worker.name}</td>
							<td>
								<Permissions condition={true}>
									<input
										data-testid="data-input-1"
										type={'number'}
										// disabled={true}
										className="form-control form-control-sm"
										// value={parseDate(
										// 	terms_data[element_key][MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id],
										// )}
									/>
								</Permissions>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Col>
	);
}

const mapStateToProps = ({ Odbiory }) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Log);
