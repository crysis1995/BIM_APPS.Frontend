import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { config } from '../../../../config';
import classNames from 'classnames';
import { reactPanelContent } from '../SELECTOR';

class ReactPanelContent extends React.Component {
	render() {
		return (
			<div className="bg-dark font-weight-bold" style={{ height: '100%' }}>
				{this.props.panel_content}
			</div>
		);
	}
}

ReactPanelContent.defaultProps = {
	panel_content: Object.keys(config.units.area.color_map).map((value) => {
		return (
			<div
				key={v4()}
				className={classNames('text-center', { 'text-light': value == 5 }, { 'text-dark': value != 5 })}
				style={{ backgroundColor: config.units.area.color_map[value].color }}>
				{config.units.area.color_map[value].option}
			</div>
		);
	}),
};

const mapStateToProps = (state) => ({ panel_content: reactPanelContent(state) });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPanelContent);
