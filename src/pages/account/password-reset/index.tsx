import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Api from '../../../services/api.service';
import { PasswordResetInput } from '../../../generated/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { CMSLoginSelectors } from '../../../state/CMSLogin/selectors';
import ModalActions from '../../../state/Modal/actions';
import { ModalType } from '../../../state/Modal/type';

export default function ResetPassword() {
	const dispatch = useDispatch();
	const { register, watch, handleSubmit, errors, reset } =
		useForm<Omit<PasswordResetInput, 'id'>>();
	const user = useSelector(CMSLoginSelectors.GetMe);

	const ResetPassword: SubmitHandler<Omit<PasswordResetInput, 'id'>> = async (data) => {
		if (user === null) {
			dispatch(
				ModalActions.InitializeModal({
					modalType: ModalType.Payload.EModalType.Error,
					body: 'Brak poprawnego ID użytkownika! Nie można zresetować hasła',
					title: 'Uwaga!',
				}),
			);
			return;
		}
		try {
			await Api.GraphQL.Operations.MutationResetPassword({
				id: user.id,
				oldPassword: data.oldPassword,
				confirmPassword: data.confirmPassword,
				newPassword: data.newPassword,
			});
			dispatch(
				ModalActions.InitializeModal({
					modalType: ModalType.Payload.EModalType.Default,
					body: 'Zmieniłeś swoje stare hasło',
					title: 'Sukces!',
				}),
			);
			reset();
		} catch (e) {
			dispatch(
				ModalActions.InitializeModal({
					modalType: ModalType.Payload.EModalType.Error,
					body: 'Coś poszło nie tak! Spróbuj ponownie',
					title: 'Uwaga!',
				}),
			);
		}
	};

	return (
		<Col className="justify-content-md-center">
			<Form onSubmit={handleSubmit(ResetPassword)}>
				<Form.Group as={Row} controlId="oldPassword">
					<Form.Label column sm={2}>
						Stare hasło
					</Form.Label>
					<Col sm={5}>
						<Form.Control
							name="oldPassword"
							type="password"
							placeholder="Stare hasło"
							ref={register({
								required: {
									value: true,
									message: 'Wymagane',
								},
							})}
						/>
					</Col>
					<Form.Text className="text-danger">
						{errors.oldPassword && errors.oldPassword.message}
					</Form.Text>
				</Form.Group>
				<Form.Group as={Row} controlId="formBasicEmail">
					<Form.Label column sm={2}>
						Hasło
					</Form.Label>
					<Col sm={5}>
						<Form.Control
							name="newPassword"
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
						{errors.newPassword && errors.newPassword.message}
					</Form.Text>
				</Form.Group>

				<Form.Group as={Row} controlId="formBasicPassword">
					<Form.Label column sm={2}>
						Potwierdzenie hasła
					</Form.Label>
					<Col sm={5}>
						<Form.Control
							name="confirmPassword"
							type="password"
							placeholder="Potwierdzenie hasła"
							ref={register({
								required: {
									value: true,
									message: 'Wymagane',
								},
								validate: (value) =>
									value === watch('newPassword') || 'Hasła muszą być identyczne',
							})}
						/>
					</Col>
					<Form.Text className="text-danger">
						{errors.confirmPassword && errors.confirmPassword.message}
					</Form.Text>
				</Form.Group>
				{/*<Form.Group as={Row} controlId="errors">*/}
				{/*	/!*<Col sm={7}>*!/*/}
				{/*	/!*	{props.fetch_error && <Alert variant={'danger'}>{props.fetch_error}</Alert>}*!/*/}
				{/*	/!*</Col>*!/*/}
				{/*	<Col sm={7}>*/}
				{/*		/!*{props.info && <Alert variant={'success'}>{props.info}</Alert>}*!/*/}
				{/*	</Col>*/}
				{/*</Form.Group>*/}

				<Button variant="primary" type="submit">
					Resetuj hasło
				</Button>
			</Form>
		</Col>
	);
}
