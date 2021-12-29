import { Element } from '../../../../generated/graphql';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state';
import { WorkProgress } from '../../../../state/WorkProgress';
import useCommentaryModal from '../../_components/Component.CommentaryModal';

export function CommentsCounter(props: { element: Element }) {
	const { CommentaryModal, setShow, show } = useCommentaryModal({ element: props.element });
	function OnClickCommentsButton() {
		setShow(true);
	}
	const [hover, setHover] = useState(false);
	const commentsCount = useSelector((state: RootState) =>
		WorkProgress.Selectors.CommentaryElement.CountElementComments(state, props.element.id),
	);

	function OnMouse(value: boolean) {
		setHover(value);
	}

	return (
		<>
			<td onMouseEnter={() => OnMouse(true)} onMouseLeave={() => OnMouse(false)}>
				<span className={'float-left'} style={{ marginLeft: '40px' }}>
					{commentsCount}
				</span>
				<a
					href="#"
					className={'hover float-right btn-link'}
					onClick={OnClickCommentsButton}
					style={{ display: hover ? 'inline' : 'none' }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						fill="currentColor"
						className="bi bi-three-dots-vertical"
						viewBox="0 0 16 16">
						<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
					</svg>
				</a>
			</td>
			<CommentaryModal show={show} setShow={setShow} element={props.element} />
		</>
	);
}
