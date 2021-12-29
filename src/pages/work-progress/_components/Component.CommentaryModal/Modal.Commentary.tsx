import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { WorkProgress } from '../../../../state/WorkProgress';
import { Modal } from 'react-bootstrap';
import { AddCommentsForm } from './Form.AddComment';
import CommentaryModalBody from './Modal.Body.Commentary';
import { Props } from './Props';

export function ComponentCommentaryModal(props: Props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			WorkProgress.Actions.CommentaryElement.FetchCommentsStart({
				elementId: props.element.id,
			}),
		);
	}, []);

	function Exit() {
		props.setShow(false);
	}

	return (
		<Modal scrollable={true} show={props.show} onHide={Exit} size={'lg'} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>
					Komentarze dla elementu:
					<span className={'ml-2 text-info'}>{props.element.revitId}</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CommentaryModalBody element={props.element} />
			</Modal.Body>
			<Modal.Footer>
				<AddCommentsForm element={props.element} />
			</Modal.Footer>
		</Modal>
	);
}