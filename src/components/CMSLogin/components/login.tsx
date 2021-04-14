import React from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userLogin } from '../redux/actions';

function Login(props) {
	const { register, handleSubmit, errors } = useForm();
	if (props.CMSLogin.is_login) return <Redirect to="/" />;
	else
		return (
			<>
				<Col xs={2} className={'pt-5'}>
					<Form onSubmit={handleSubmit(props.userLogin)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address / Login</Form.Label>
							<Form.Control
								name="identifier"
								type="text"
								placeholder="login"
								ref={register({
									required: {
										value: true,
										message: 'Wymagane',
									},
								})}
							/>
							<Form.Text className="text-danger">{errors.identifier && errors.identifier.message}</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Hasło</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="hasło"
								ref={register({
									required: {
										value: true,
										message: 'Wymagane',
									},
								})}
							/>
							<Form.Text className="text-danger">{errors.password && errors.password.message}</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check name="checkbox" ref={register()} type="checkbox" label="Zapamiętaj mnie" />
						</Form.Group>
						{props.CMSLogin.error && <Alert variant={'danger'}>{props.CMSLogin.error}</Alert>}
						<Button className="float-right" variant="primary" type="submit">
							Zaloguj się
						</Button>
					</Form>
				</Col>
			</>
		);
}

const mapStateToProps = ({ CMSLogin }) => ({
	CMSLogin,
});

const mapDispatchToProps = { userLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
