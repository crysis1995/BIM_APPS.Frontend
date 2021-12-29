import React, { useState } from 'react';
import { CommentaryModalPool } from './Pool.CommentaryModal';
import { Input } from './Input';
import { Output } from './Output';


export default function useCommentaryModal(props: Input): Output {
	const [show, setShow] = useState(false);
	return {
		CommentaryModal: CommentaryModalPool,
		show,
		setShow,
	};
}
