import React from 'react';
import { ComponentCommentaryModal } from './Modal.Commentary';
import { Props } from './Props';

export function CommentaryModalPool(props: Props) {
	if (!props.element || !props.show) return <></>;
	return <ComponentCommentaryModal {...props} />;
}
