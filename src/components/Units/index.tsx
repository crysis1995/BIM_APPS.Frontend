import React from 'react';
import { RoundNumber } from '../../utils/RoundNumber';

export enum EUnit {
	M2 = 'm2',
	M3 = 'm3',
	CM = 'cm',
	NONE = '',
}
type Props = {
	children: JSX.Element | number;
	precision?: number;
	unit: EUnit;
};

function UnitFactory(unitType: EUnit) {
	switch (unitType) {
		case EUnit.M2:
			return (
				<>
					m<sup>2</sup>
				</>
			);
		case EUnit.M3:
			return (
				<>
					m<sup>3</sup>
				</>
			);
		case EUnit.CM:
			return <>cm</>;
		case EUnit.NONE:
			return <></>;
		default:
			return <></>;
	}
}

export function Units(props: Props) {
	let unit = UnitFactory(props.unit);
	const children =
		typeof props.children === 'number'
			? RoundNumber(props.children, props.precision)
			: props.children;
	if (children == null) return null;
	return (
		<span>
			{children} {unit}
		</span>
	);
}

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
