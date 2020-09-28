import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';
import { TEST, TEST_START } from './redux/types';

const WorkProgress = React.lazy(() => import('./components'));
const Viewer = React.lazy(() => import('../../components/ForgeViewer/components'));

function AcceptanceLayout(props) {
	if (!props.CMSLogin.is_login) return <Redirect to="/login" />;
	else
		return (
			<React.Suspense fallback={<Loader />}>
				<Col>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						{props.isLogin && props.started ? (
							<Viewer />
						) : (
							<div className="position-center align-items-center mt-5">
								<p onClick={() => props.click()}>Usługa BIM360 niedostępna</p>
							</div>
						)}
					</div>
				</Col>
				<Col>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						{props.isLogin ? <WorkProgress {...props} /> : null}
					</div>
				</Col>
			</React.Suspense>
		);
}

const mapStateToProps = ({ Autodesk, Odbiory, CMSLogin }) => ({
	isLogin: Autodesk.isLogin,
	started: Odbiory.OdbioryComponent.started,
	CMSLogin,
});
const mapDispatchToProps = {
	click: () => (dispatch) => dispatch({ type: TEST }),
};
export default connect(mapStateToProps, mapDispatchToProps)(AcceptanceLayout);
