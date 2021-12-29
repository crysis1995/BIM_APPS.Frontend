import { useDispatch, useSelector } from 'react-redux';
import { CMSLoginSelectors } from '../../../../state/CMSLogin/selectors';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoggerService from '../../../../services/logger.service';
import { CreateCommentaryElementDtoInput } from '../../../../generated/graphql';
import { WorkProgress } from '../../../../state/WorkProgress';
import Api from '../../../../services/api.service';
import { Button, Col, Form, Row } from 'react-bootstrap';
import React from 'react';
import { Props } from './Props';

type FormData = {
	content: string;
};
export function AddCommentsForm(props: Pick<Props, 'element'>) {
	const me = useSelector(CMSLoginSelectors.GetMe);
	const dispatch = useDispatch();
	const { register, handleSubmit, errors, reset } = useForm<FormData>();

	const OnSubmit: SubmitHandler<FormData> = async (form) => {
		if (!me) {
			LoggerService.error(
				'[component] : AddCommentsForm \t [message] : Nie znaleziono usera',
			);
			return;
		}
		const input: CreateCommentaryElementDtoInput = {
			element: { id: props.element.id },
			content: form.content,
			user: { id: me.id },
		};
		try {
			dispatch(
				WorkProgress.Actions.CommentaryElement.CreateCommentaryElementStart({
					elementId: props.element.id,
				}),
			);
			const { data } = await Api.GraphQL.Operations.MutationCreateCommentaryElement(input);

			if (data) {
				dispatch(
					WorkProgress.Actions.CommentaryElement.CreateCommentaryElementFinish({
						elementId: props.element.id,
						commentaryElement: data.createCommentaryElement,
					}),
				);
			}
		} catch (e) {
			LoggerService.error(
				`[component] : AddCommentsForm \t [message] : Nie dodano komentarza do elementu [id]:${props.element.id}`,
			);
		} finally {
			dispatch(
				WorkProgress.Actions.CommentaryElement.CreateCommentaryElementError({
					elementId: props.element.id,
				}),
			);
		}
		reset();
	};

	return (
		<Form onSubmit={handleSubmit(OnSubmit)} className={'col p-0'}>
			<Row>
				<Form.Group as={Col} controlId="asd123">
					<Form.Control
						name="content"
						size="sm"
						as="textarea"
						type="text"
						placeholder="Treść komentarza..."
						ref={register({
							minLength: {
								value: 1,
								message: 'Pole nie może być puste',
							},
							maxLength: {
								value: 500,
								message: 'Pole nie może być dłuższe niż 500 znaków',
							},
						})}
					/>
					<Form.Text muted={true}>
						<span className={'text-error'}>
							{errors.content && errors.content.message}
						</span>
					</Form.Text>
				</Form.Group>

				<Col xs={'auto'}>
					<Button size={'sm'} type={'submit'} variant={'success'}>
						Dodaj komentarz
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
