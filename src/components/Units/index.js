import React from 'react';
import { RoundNumber } from '../../utils/RoundNumber';

// /**
//  *
//  * @param unit {UNITS}
//  * @param children {JSX.Element|*}
//  * @return {JSX.Element|*}
//  * @constructor
//  */
// export function Units({ unit, children }) {
// 	switch (unit) {
// 		case UNITS.M2:
// 			return <M2>{children}</M2>;
// 		case UNITS.M3:
// 			return <M3>{children}</M3>;
// 		default:
// 			return <span>children</span>;
// 	}
// }

function M2({ children}) {
	if (typeof children === 'number') children = RoundNumber(children);
	return (
		<span>
			{children} m<sup>2</sup>
		</span>
	);
}
function M3({ children }) {
	return (
		<span>
			{children} m<sup>3</sup>
		</span>
	);
}
function NONE({ children }) {
	return <span>{children}</span>;
}
const UNITS = {
	M2,
	M3,
	NONE,
};

export default UNITS;
