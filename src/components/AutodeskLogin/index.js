import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import AutodeskLoginActions from './redux/actions';

class AutodeskLogin extends React.Component {
	componentDidMount() {
		this.props.handleFetchAccessToken();
	}
	render() {
		return (
			<div className="mr-4 my-auto">
				<span className="align-middle mr-2 font-weight-bold">BIM360: </span>
				<span
					className={classnames('align-middle badge ', {
						'badge-success': !!this.props.login_3_legged.access_token,
						'badge-danger': !this.props.login_3_legged.access_token,
					})}>
					{this.props.login_3_legged.access_token ? 'ONLINE' : 'OFFLINE'}
				</span>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	login_3_legged: state.Autodesk.login_3_legged,
});

const mapDispatchToProps = {
	handleFetchAccessToken: AutodeskLoginActions.handleFetchAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutodeskLogin);
