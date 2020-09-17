import React from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function TermsComponent(props) {
	return (
		<Accordion data-testid="TermsComponent">
			<Table>
				<thead>
					<tr>
						<th>Robota</th>
						<th>Data rzeczywistego rozpoczęcia (DRR)</th>
						<th>Data planowanego zakończenia (DPZ)</th>
						<th>Data rzeczywistego zakończenia (DRZ)</th>
					</tr>
				</thead>
				<tbody>
					<Accordion.Toggle as="tr" eventKey="0">
						{/* <tr> */}

						<td>Jakaś długa nazwa roboty</td>

						<td>asdasd</td>
						<td>asdasdasdasd</td>
						<td>asdasdasdasdasdasd</td>
					</Accordion.Toggle>

					<Accordion.Collapse eventKey="0">
						<li>
							<ul colSpan={3}>Hello! I'm the body</ul>
							<ul>asdasd</ul>
						</li>
					</Accordion.Collapse>

					{/* </tr> */}
				</tbody>
			</Table>
		</Accordion>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
