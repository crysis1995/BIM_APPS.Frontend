import React, { useState } from 'react';
import { Col, Form, Nav, Row } from 'react-bootstrap';
import { Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import CMSLoginActions from '../redux/actions';
import { CMSLogin } from '../type';

const mapStateToProps = (state: { CMSLogin: CMSLogin.Redux.Store }) => ({
	info: state.CMSLogin.info,
});

const mapDispatchToProps = {
	resetPassword: CMSLoginActions.UserResetPasswordInit,
};

export enum AccountSettingsTab {
	ACCOUNT_SETTINGS = 'account_settings',
	PERMISSIONS_SETTINGS = 'permissions_settings',
	PASSWORD_RESET = 'password_reset',
	NONE = '',
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function AccountSettings(props: Props) {
	const [activeTab, setActiveTab] = useState<AccountSettingsTab>(AccountSettingsTab.NONE);
	const { register, watch, handleSubmit, errors } = useForm();
	const submit = (e: any) => console.log(e);
	return (
		<>
			<Col xs="2" className="p-5">
				<Nav className="flex-column" variant="pills">
					<Nav.Item>
						<Nav.Link
							onSelect={(e) => setActiveTab(AccountSettingsTab.ACCOUNT_SETTINGS)}
							eventKey={AccountSettingsTab.ACCOUNT_SETTINGS}
							disabled>
							Ustawienia konta
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							onSelect={(e) => setActiveTab(AccountSettingsTab.PERMISSIONS_SETTINGS)}
							eventKey={AccountSettingsTab.PERMISSIONS_SETTINGS}>
							Ustawienia dostępów
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							onSelect={(e) => setActiveTab(AccountSettingsTab.PASSWORD_RESET)}
							eventKey={AccountSettingsTab.PASSWORD_RESET}>
							Reset hasła
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
			{activeTab === AccountSettingsTab.PASSWORD_RESET && (
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
								{/*<Col sm={7}>*/}
								{/*	{props.fetch_error && <Alert variant={'danger'}>{props.fetch_error}</Alert>}*/}
								{/*</Col>*/}
								<Col sm={7}>{props.info && <Alert variant={'success'}>{props.info}</Alert>}</Col>
							</Form.Group>

							<Button variant="primary" type="submit">
								Resetuj hasło
							</Button>
						</Form>
					</Col>
				</>
			)}
			{activeTab === AccountSettingsTab.ACCOUNT_SETTINGS && <Col className="p-5">Ustawienia konta</Col>}
			{activeTab === AccountSettingsTab.PERMISSIONS_SETTINGS && <Col className="p-5">Ustawienia dostępów</Col>}
			{activeTab === AccountSettingsTab.NONE && <Col className="p-5">Wybierz akcję</Col>}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
