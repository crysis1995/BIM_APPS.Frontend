import Permissions from '../../../../components/Permissions';
import React from 'react';
import { connect } from 'react-redux';
import JobsSummary from './JobsSummary';

function Tools(props) {
	return (
		<Permissions condition={true} show_alert={false}>
			<div className="mb-4">
				<div>Narzędzia aplikacji</div>
				<div className="pt-1">
					<JobsSummary />
				</div>
			</div>
		</Permissions>
	);
}

const mapStateToProps = ({ CMSLogin: { user, project } }) => ({ user, project });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
