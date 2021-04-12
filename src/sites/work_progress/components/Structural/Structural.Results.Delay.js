import React, { useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from '../../../../components/Loader';
import { initCreateNewDelay } from '../../redux/actions/delays_actions';

const baseMargin = 25;

function Delay({ initCreateNewDelay, delay_causes_loading, delay_causes, active_crane, active_level, rotation_day }) {
	const [active, setActive] = useState([]);
	const [text, setText] = useState('');
	if (!active_crane || !active_level || !rotation_day) return null;
	if (delay_causes_loading) return <Loader />;

	function ChildCheck({ object, margin }) {
		if (object.hasOwnProperty('children')) {
			return (
				<>
					<Form.Check
						checked={active.includes(object.id)}
						style={{ marginLeft: margin }}
						onClick={(e) =>
							setActive((prevState) =>
								prevState.includes(object.id)
									? prevState.filter((e) => e !== object.id)
									: prevState.length < 3
									? [...prevState, object.id]
									: prevState,
							)
						}
						type="checkbox"
						label={<small>{object.label}</small>}
					/>
					{object.children.map((child) => (
						<ChildCheck object={child} margin={margin + baseMargin} />
					))}
				</>
			);
		} else {
			return (
				<Form.Check
					checked={active.includes(object.id)}
					onClick={(e) =>
						setActive((prevState) =>
							prevState.includes(object.id)
								? prevState.filter((e) => e !== object.id)
								: prevState.length < 3
								? [...prevState, object.id]
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
							{delay_causes.map((obj, index) => (
								<ListGroup.Item key={index} className={'btn-sm p-2 m-0'} action eventKey={index}>
									{obj.label}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							{delay_causes.map((obj, index) => (
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
							initCreateNewDelay(active_crane, active_level, rotation_day, active, text);
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
	delays: state.Odbiory.Delays.MONOLITHIC.byCrane,
	delay_causes_loading: state.Odbiory.Delays.MONOLITHIC.delay_causes_loading,
	delay_causes: state.Odbiory.Delays.MONOLITHIC.delay_causes,
});

const mapDispatchToProps = { initCreateNewDelay };

export default connect(mapStateToProps, mapDispatchToProps)(Delay);
