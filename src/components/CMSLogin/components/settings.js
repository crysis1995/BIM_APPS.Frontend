import React, { useState } from 'react';
import { Col, Form, Nav, Row } from 'react-bootstrap';
import { Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { resetPassword } from '../redux/actions';

function AccountSettings(props) {
	const [activeTab, setActiveTab] = useState(null);
	const { register, watch, handleSubmit, errors } = useForm();
	const submit = (e) => console.log(e);
	return (
		<>
			<Col xs="2" className="p-5">
				<Nav className="flex-column" variant="pills">
					<Nav.Item>
						<Nav.Link onSelect={(e) => setActiveTab(e)} eventKey="account_settings" disabled>
							Ustawienia konta
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onSelect={(e) => setActiveTab(e)} eventKey="permissions_settings">
							Ustawienia dostępów
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onSelect={(e) => setActiveTab(e)} eventKey="password_reset">
							Reset hasła
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
			{activeTab === 'password_reset' && (
				<>
					<Col className="p-5 justify-content-md-center">
						<Form onSubmit={handleSubmit(props.resetPassword)}>
							<Form.Group as={Row} controlId="formBasicEmail">
								<Form.Label column sm={2}>
									Hasło
								</Form.Label>
								<Col sm={5}>
									<Form.Control
										name="password"
										type="password"
										placeholder="Hasło"
										ref={register({
											required: {
												value: true,
												message: 'Wymagane',
											},
										})}
									/>
								</Col>
								<Form.Text className="text-danger">
									{errors.password && errors.password.message}
								</Form.Text>
							</Form.Group>

							<Form.Group as={Row} controlId="formBasicPassword">
								<Form.Label column sm={2}>
									Potwierdzenie hasła
								</Form.Label>
								<Col sm={5}>
									<Form.Control
										name="passwordConfirmation"
										type="password"
										placeholder="Potwierdzenie hasła"
										ref={register({
											required: {
												value: true,
												message: 'Wymagane',
											},
											validate: (value) =>
												value === watch('password') || 'Hasła muszą być identyczne',
										})}
									/>
								</Col>
								<Form.Text className="text-danger">
									{errors.passwordConfirmation && errors.passwordConfirmation.message}
								</Form.Text>
							</Form.Group>
							<Form.Group as={Row} controlId="errors">
								<Col sm={7}>
									{props.fetch_error && <Alert variant={'danger'}>{props.fetch_error}</Alert>}
								</Col>
								<Col sm={7}>{props.info && <Alert variant={'success'}>{props.info}</Alert>}</Col>
							</Form.Group>

							<Button variant="primary" type="submit">
								Resetuj hasło
							</Button>
						</Form>
					</Col>
				</>
			)}

			{activeTab === 'account_settings' && <Col className="p-5">Ustawienia konta</Col>}
			{activeTab === 'permissions_settings' && <Col className="p-5">Ustawienia dostępów</Col>}
			{!activeTab && <Col className="p-5">Wybierz akcję</Col>}
		</>
	);
}

const mapStateToProps = ({ CMSLogin }) => ({
	fetch_error: CMSLogin.error,
	info: CMSLogin.info,
});

const mapDispatchToProps = { resetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
