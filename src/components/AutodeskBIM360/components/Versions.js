import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';
import { connect } from 'react-redux';

class Items extends React.Component {
	componentDidMount() {
		console.log(this.props.item.type);
	}

	render() {
		return <TreeItem nodeId={this.props.item.id} label={this.props.item.attributes.displayName} />;
	}
}

const mapStateToProps = (state) => ({
	...state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
