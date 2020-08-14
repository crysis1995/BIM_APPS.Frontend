import React from 'react';
import { connect } from 'react-redux';
import { fetchAccessToken } from './redux/operations';


class AutodeskLogin extends React.Component {
    componentDidMount() {
        this.props.fetchAccessToken();
    }
    render() {
        return (
            <div className="mr-5 my-auto">
                <span className="align-middle mr-2 font-weight-bold">BIM360: </span>
                {this.props.Autodesk.login_3_legged.access_token ? (
                    <span className="align-middle badge badge-success">ONLINE</span>
                ) : (
                    <span className="align-middle badge badge-danger">OFFLINE</span>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ Autodesk }) => ({
    Autodesk,
});

const mapDispatchToProps = {
    fetchAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutodeskLogin);
