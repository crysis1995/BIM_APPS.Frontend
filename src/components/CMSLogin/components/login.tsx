import React, { useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { CMSLoginType } from '../type';
import CMSLoginActions from '../redux/actions';
import GraphQLAPIService from '../../../services/graphql.api.service';
import { setCachedData } from '../redux/utils';

const mapStateToProps = (state: { CMSLogin: CMSLoginType.Redux.Store }) => ({
	is_login: state.CMSLogin.is_login,
});

const mapDispatchToProps = {
	UserLoginEnd: CMSLoginActions.UserLoginEnd,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function Login(props: Props) {
	const { register, handleSubmit, errors } = useForm();
	const [formErrors, setFormErrors] = useState<null | string[]>(null);

	const onSubmit = async (formFata: { identifier: string; password: string; checkbox: boolean }) => {
		try {
			const { data } = await new GraphQLAPIService().login({
				name: formFata.identifier,
				password: formFata.password,
			});
			if (data) {
				props.UserLoginEnd(data.login.user.id, { access_token: data.login.jwt });
				if (formFata.checkbox) setCachedData<typeof data.login.user>(data.login.user, data.login.jwt);
			}
		} catch (e) {
			setFormErrors(['Logowanie się nie powiodło!']);
		}
	};

	if (props.is_login) return <Redirect to="/" />;
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
							<Form.Text className="text-danger">{errors.password && errors.password.message}</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check name="checkbox" ref={register()} type="checkbox" label="Zapamiętaj mnie" />
						</Form.Group>
						{formErrors && formErrors.map((err) => <Alert variant={'danger'}>{err}</Alert>)}
						<Button className="float-right" variant="primary" type="submit">
							Zaloguj się
						</Button>
					</Form>
				</Col>
			</>
		);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
