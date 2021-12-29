import React, { createContext, createRef, useLayoutEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Viewer from '../../../../components/ForgeViewer/components';
import { EApplicationsWithModules } from '../../../../sites/types';
import ButtonGroupWithActions from '../Organisms/ButtonGroupWithActions';
import ElementContainer from '../Organisms/ElementContainer';

// export const Context = createContext<{ width: number; height: number } | null>(null);

function PageIndex() {
	// const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	// const ref = createRef<HTMLDivElement>();
	// useLayoutEffect(() => {
	// 	if (ref.current) {
	// 		setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight });
	// 	}
	// }, []);
	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<div  className={'d-flex flex-column w-100 p-3'}>
						<div className={'d-flex flex-row pb-3'}>
							<Col className={'p-0'}>
								<ButtonGroupWithActions />
							</Col>
						</div>
						<div  className={'d-flex flex-column'} style={{ height: '100%' }}>
							{/*<Context.Provider value={dimensions}>*/}
								<ElementContainer />
							{/*</Context.Provider>*/}
						</div>
					</div>
				</div>
			</Col>
		</>
	);
}

export default PageIndex;
