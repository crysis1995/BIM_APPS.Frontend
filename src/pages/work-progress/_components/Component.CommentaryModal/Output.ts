import React from 'react';
import { Props } from './Props';

export type Output = {
	CommentaryModal: (props: Props) => JSX.Element;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
