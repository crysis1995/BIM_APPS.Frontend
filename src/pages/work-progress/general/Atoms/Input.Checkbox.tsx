import React, { createRef, useEffect } from 'react';
import { Element } from '../../../../generated/graphql';
import { RootState } from '../../../../state';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export type SelectorOutput = {
	checked: boolean;
	indeterminate?: boolean;
	toSelect: (Element | number) | (Element | number)[];
};
export type ComponentProps = {
	Selector: (state: RootState, props?: Element | number) => SelectorOutput;
	element?: Element | number;
	OnClick: (selectorOutput: SelectorOutput) => void;
};
export default function InputCheckbox(props: ComponentProps) {
	const output = useSelector(
		(state: RootState) => props.Selector(state, props.element),
		_.isEqual,
	);
	const ref = createRef<HTMLInputElement>();
	const handleClick = () => props.OnClick(output);

	useEffect(() => {
		if (!ref.current) return;
		ref.current.indeterminate = output.indeterminate ?? false;
		ref.current.checked = output.checked;
	}, [ref, output]);

	return <input ref={ref} type={'checkbox'} onClick={handleClick} checked={output.checked} />;
}
