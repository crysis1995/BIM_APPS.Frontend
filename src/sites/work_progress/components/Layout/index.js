import React from 'react';
import { ACCEPTANCE_TYPE } from '../../redux/types/constans';
const Structural = React.lazy(() => import('./Structural'));
const { MONOLITHIC } = ACCEPTANCE_TYPE;

/**
 * @enum {ACCEPTANCE_TYPE}
 */
export default {
	MONOLITHIC: Structural,
};
