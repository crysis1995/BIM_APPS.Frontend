import React from 'react';
import { connect } from 'react-redux';
import JobsSummary from './JobsSummary';

function Tools(props) {
	// sprawdzam czy user posiada uprawnienia
	if (props.user.hasAccess || true) {
		return (
			<div className="mb-4">
				<div>Narzędzia aplikacji</div>
				<div className="pt-1">
					<JobsSummary />
				</div>
			</div>
		);
	} else {
		return null;
	}
}

const mapStateToProps = ({ CMSLogin }) => ({ user: CMSLogin.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
