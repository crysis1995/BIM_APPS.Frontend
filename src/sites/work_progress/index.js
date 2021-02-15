import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../../components/Loader';
import Permissions from '../../components/Permissions';

import Layout from './components/Layout';
import { setAcceptanceType } from './redux/actions/odbiory_actions';
import { ACCEPTANCE_TYPE } from './redux/types/constans';

const WorkProgress = React.lazy(() => import('./components'));
const Viewer = React.lazy(() => import('../../components/ForgeViewer/components'));

function AcceptanceLayout(props) {
	const acceptance_type = props.match.params.type;
	useEffect(() => {
		props.setAcceptanceType(acceptance_type);
	}, [acceptance_type]);
	if (!acceptance_type) return <Redirect to="/" />;
	return (
		<React.Suspense fallback={<Loader />}>
			<Route exact path={`/work_progress/${ACCEPTANCE_TYPE.MONOLITHIC}`}>
				<Permissions
					variant={'danger'}
					Wrapper={Col}
					className="p-3"
					message={'Nie masz dostępu do tej zakładki'}
					condition={true}>
					<Col xs={6}>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							{props.started.hasOwnProperty(ACCEPTANCE_TYPE.MONOLITHIC) && <Viewer />}
						</div>
					</Col>
					<Col xs={6}>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							<Layout.MONOLITHIC />
						</div>
					</Col>
				</Permissions>
			</Route>
			<Route exact path={`/work_progress/${ACCEPTANCE_TYPE.ARCHITECTURAL}`}>
				<Permissions
					variant={'danger'}
					Wrapper={Col}
					className="p-3"
					message={'Nie masz dostępu do tej zakładki'}
					condition={true}>
					<Col>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							{props.started.hasOwnProperty(ACCEPTANCE_TYPE.ARCHITECTURAL) && <Viewer />}
						</div>
					</Col>
					<Col>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							<WorkProgress />
						</div>
					</Col>
				</Permissions>
			</Route>
			<Route exact path={`/work_progress/${ACCEPTANCE_TYPE.MEP}`}>
				<Permissions
					variant={'danger'}
					Wrapper={Col}
					className="p-3"
					message={'Nie masz dostępu do tej zakładki'}
					condition={true}>
					<Col>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							{props.started.hasOwnProperty(ACCEPTANCE_TYPE.MEP) && <Viewer />}
						</div>
					</Col>
					<Col>
						<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
							<WorkProgress />
						</div>
					</Col>
				</Permissions>
			</Route>
		</React.Suspense>
	);
}

const mapStateToProps = ({ Autodesk, Odbiory, CMSLogin }) => ({
	Autodesk_is_login: Autodesk.isLogin,
	started: Odbiory.OdbioryComponent.started,
	CMS_is_login: CMSLogin.is_login,
	project: CMSLogin.project,
});
const mapDispatchToProps = { setAcceptanceType };
export default connect(mapStateToProps, mapDispatchToProps)(AcceptanceLayout);
