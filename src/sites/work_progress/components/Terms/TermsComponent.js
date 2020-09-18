import React from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function TermsComponent(props) {
	const onClickHandler = (e) => {
		const hiddenElement = e.currentTarget.nextSibling;
		hiddenElement.className.indexOf('collapse show') > -1
			? hiddenElement.classList.remove('show')
			: hiddenElement.classList.add('show');
	};
	return (
		<Table data-testid="TermsComponent">
			<thead>
				<tr>
					<th>#</th>
					<th>Date</th>
					<th>Description</th>
					<th>Credit</th>
				</tr>
			</thead>
			<tbody>
				<tr onClick={onClickHandler}>
					<td>1</td>
					<td>05 May 2013</td>
					<td className="text-success">$150.00</td>
					<td className="text-success">$150.00</td>
				</tr>
				<tr className="collapse">
					<td></td>
					<td>Demo asddasasd</td>
					<td>Demo asd</td>
					<td>Demo asd</td>
				</tr>
				<tr onClick={onClickHandler}>
					<td>2</td>
					<td>05 May 2013</td>
					<td className="text-success">$150.00</td>
					<td className="text-success">$150.00</td>
				</tr>
				<tr className="collapse">
					<td></td>
					<td>Demo 22222</td>
					<td>Demo as222d</td>
					<td>Demo a22sd</td>
				</tr>
			</tbody>
		</Table>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
