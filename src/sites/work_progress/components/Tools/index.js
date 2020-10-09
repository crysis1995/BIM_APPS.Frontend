import Permissions from '../../../../components/Permissions';
import React from 'react';
import { connect } from 'react-redux';
import JobsSummary from './JobsSummary';

function Tools(props) {
	return (
		<Permissions condition={false}>
			<div className="mb-4">
				<div>Narzędzia aplikacji</div>
				<div className="pt-1">
					<JobsSummary />
				</div>
			</div>
		</Permissions>
	);
}

const mapStateToProps = ({ CMSLogin }) => ({ user: CMSLogin.user, project:CMSLogin.project });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
