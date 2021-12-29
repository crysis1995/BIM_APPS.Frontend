import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Api from '../../services/api.service';
import NotificationActions from '../../state/Notifications/actions';
import { CMSLoginSelectors } from '../../state/CMSLogin/selectors';
import { CMSLoginType } from '../../state/CMSLogin/type';
import CMSLoginActions from '../../state/CMSLogin/actions';

function Login() {
	const dispatch = useDispatch();
	const isLogin = useSelector(CMSLoginSelectors.IsLogin);

	const { register, handleSubmit, errors } = useForm();
	const [formErrors, setFormErrors] = useState<null | string[]>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFormErrors(null);
		}, 5000);
		return () => clearTimeout(timeout);
	}, [formErrors]);

	const onSubmit = async (formFata: {
		identifier: string;
		password: string;
		checkbox: boolean;
	}) => {
		try {
			const { data, errors } = await Api.GraphQL.Operations.MutationLogin({
				email: formFata.identifier,
				password: formFata.password,
			});
			if (data) {
				const loginInput: CMSLoginType.Payload.ActionInput.IUserLoginInput = {
					credentials: {
						token: data.login.token,
					},
					remember_me: formFata.checkbox,
				};
				dispatch(CMSLoginActions.UserLogin(loginInput));
			}
			if (errors) {
				setFormErrors(errors.map((e) => e.message));
			}
		} catch (e) {
			dispatch(
				NotificationActions.showNotification({
					title: 'Błąd serwera',
					message: 'Nie udało się połączyć z serwerem autoryzacyjnym',
				}),
			);
		}
	};

	if (isLogin) return <Navigate replace to="/" />;
	else
		return (
			<>
				<Col xs={2} className={'pt-5'}>
					<Form onSubmit={handleSubmit(onSubmit)}>
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
							<Form.Text className="text-danger">
								{errors.identifier && errors.identifier.message}
							</Form.Text>
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
							<Form.Text className="text-danger">
								{errors.password && errors.password.message}
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check
								name="checkbox"
								ref={register()}
								type="checkbox"
								label="Zapamiętaj mnie"
							/>
						</Form.Group>
						{formErrors &&
							formErrors.map((err, index) => (
								<Alert key={index} variant={'danger'}>
									{err}
								</Alert>
							))}
						<Button className="float-right" variant="primary" type="submit">
							Zaloguj się
						</Button>
					</Form>
				</Col>
			</>
		);
}

export default Login;
