import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import AutodeskLoginActions from './redux/actions';
import { AutodeskLogin } from './type';
type RootState = { Autodesk: AutodeskLogin.Redux.Store };

const mapStateToProps = (state: RootState) => ({
	login_3_legged: state.Autodesk.login_3_legged,
});

const mapDispatchToProps = {
	HandleFetchAccessToken: AutodeskLoginActions.HandleFetchAccessToken,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
class AutodeskLoginComponent extends React.Component<Props, never> {
	componentDidMount() {
		this.props.HandleFetchAccessToken();
	}
	render() {
		const BANDAGE = this.props.login_3_legged?.access_token ? 'badge-success' : 'badge-danger';
		const STATUS = this.props.login_3_legged?.access_token ? 'ONLINE' : 'OFFLINE';
		return (
			<div className="mr-4 my-auto">
				<span className="align-middle mr-2 font-weight-bold">BIM360: </span>
				<span className={classnames('align-middle badge ', BANDAGE)}>{STATUS}</span>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AutodeskLoginComponent);
