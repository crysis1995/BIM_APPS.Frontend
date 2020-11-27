import React, { useState } from 'react';
import { Col, Form, Row, Tab, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createNewDelay, updateExistDelay } from '../../redux/actions/delays_actions';
import { MONOLITHIC } from '../../redux/types/constans';

const baseMargin = 25;

function Delay({ createNewDelay, updateExistDelay, delays, active_crane, active_level, rotation_day }) {
	const { selected_cases, commentary } =
		delays.hasOwnProperty('byCrane') &&
		delays.byCrane.hasOwnProperty(active_crane) &&
		delays.byCrane[active_crane].hasOwnProperty('byLevel') &&
		delays.byCrane[active_crane].byLevel.hasOwnProperty(active_level) &&
		delays.byCrane[active_crane].byLevel[active_level].hasOwnProperty('byRotationDay') &&
		delays.byCrane[active_crane].byLevel[active_level].byRotationDay.hasOwnProperty(rotation_day) &&
		delays.byCrane[active_crane].byLevel[active_level].byRotationDay[rotation_day];

	const [active, setActive] = useState(selected_cases || []);
	const [text, setText] = useState(commentary || '');
	function ChildCheck({ object, margin, parentId }) {
		if (object.hasOwnProperty('children')) {
			return (
				<>
					<Form.Check
						checked={active.includes(parentId)}
						style={{ marginLeft: margin }}
						onClick={(e) =>
							setActive((prevState) =>
								prevState.includes(parentId)
									? prevState.filter((e) => e !== parentId)
									: prevState.length < 3
									? [...prevState, parentId]
									: prevState,
							)
						}
						type="checkbox"
						label={<small>{object.label}</small>}
					/>
					{object.children.map((child) => (
						<ChildCheck object={child} margin={margin + baseMargin} parentId={`${parentId}.${child.id}`} />
					))}
				</>
			);
		} else {
			return (
				<Form.Check
					checked={active.includes(parentId)}
					onClick={(e) =>
						setActive((prevState) =>
							prevState.includes(parentId)
								? prevState.filter((e) => e !== parentId)
								: prevState.length < 3
								? [...prevState, parentId]
								: prevState,
						)
					}
					style={{ marginLeft: margin }}
					type="checkbox"
					label={<small>{object.label}</small>}
				/>
			);
		}
	}

	return (
		<Col xs={12} className="h-100">
			<div className={'pt-4 text-center'}>
				<h6>Określ przyczynę opóźnień (min. 1 | maks. 3)</h6>
			</div>
			<hr />
			<Tab.Container id="list-group-tabs-example">
				<Row>
					<Col sm={4}>
						<ListGroup variant={'flush'}>
							{MONOLITHIC.DELAY.map((obj, index) => (
								<ListGroup.Item key={index} className={'btn-sm p-2 m-0'} action eventKey={index}>
									{obj.label}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							{MONOLITHIC.DELAY.map((obj, index) => (
								<Tab.Pane key={index} eventKey={index}>
									<ChildCheck object={obj} margin={0} parentId={obj.id} />
								</Tab.Pane>
							))}
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
			<hr />
			<Row>
				<Col>
					<Form.Label>Komentarz</Form.Label>
					<Form.Control as="textarea" rows={2} value={text} onChange={(e) => setText(e.target.value)} />
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<Button
						onClick={() => {
							if (!selected_cases && !commentary) {
								createNewDelay(active_crane, active_level, rotation_day, active, text);
							} else {
								updateExistDelay(active_crane, active_level, rotation_day, active, text);
							}
							setActive([]);
							setText('');
						}}
						variant={'success'}>
						Zapisz!
					</Button>
				</Col>
			</Row>
		</Col>
	);
}

const mapStateToProps = (state) => ({
	active_crane: state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	active_level: state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	rotation_day: state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
	delays: state.Odbiory.Delays.MONOLITHIC,
});

const mapDispatchToProps = { createNewDelay, updateExistDelay };

export default connect(mapStateToProps, mapDispatchToProps)(Delay);
