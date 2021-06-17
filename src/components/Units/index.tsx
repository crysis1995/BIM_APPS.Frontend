import React from 'react';
import { RoundNumber } from '../../utils/RoundNumber';

function M2({ children, precision = 2 }: { children: JSX.Element | number; precision?: number }) {
	if (typeof children === 'number') children = RoundNumber(children, precision);
	return (
		<span>
			{children} m<sup>2</sup>
		</span>
	);
}
function M3({ children, precision = 2 }: { children: JSX.Element | number; precision?: number }) {
	if (typeof children === 'number') children = RoundNumber(children, precision);
	return (
		<span>
			{children} m<sup>3</sup>
		</span>
	);
}
function CM({ children, precision = 2 }: { children: JSX.Element | number; precision?: number }) {
	if (typeof children === 'number') children = RoundNumber(children, precision);
	return <span>{children} cm</span>;
}
function NONE({ children, precision = 2 }: { children: JSX.Element | number; precision?: number }) {
	if (typeof children === 'number') children = RoundNumber(children, precision);
	return <span>{children}</span>;
}
const UNITS = {
	M2,
	M3,
	NONE,
	CM,
};

export default UNITS;
