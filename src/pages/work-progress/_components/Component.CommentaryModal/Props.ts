import React from 'react';
import { Element } from '../../../../generated/graphql';

export type Props = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	element: Element;
};