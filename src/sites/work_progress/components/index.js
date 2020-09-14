import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { componentStarted, changeActiveTab } from '../redux/actions/odbiory_actions';
import LevelSelectorComponent from './LevelSelectorComponent';
import OdbioryComponent from './OdbioryComponent';
import ResultsComponent from './Results';
import Tools from './Tools';

class Odbiory extends React.Component {
	componentDidMount() {
		const { componentStarted } = this.props;
		componentStarted();
	}

	render() {
		if (!this.props.sheets_loaded) return <Loader />;
		else
			return (
				<>
					<div className="d-flex flex-column p-3 w-100">
						<Tools />
						<LevelSelectorComponent />
						<Nav variant="tabs" className="mt-3" defaultActiveKey={'results'}>
							<Nav.Item>
								<Nav.Link
									onSelect={(e) => this.props.awansowanie_is_active && this.props.changeActiveTab(e)}
									eventKey={'results'}>
									Rezultaty
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									onSelect={(e) => this.props.results_is_active && this.props.changeActiveTab(e)}
									eventKey={'progress'}>
									Awansowanie robót
								</Nav.Link>
							</Nav.Item>
						</Nav>

						{this.props.awansowanie_is_active ? (
							!this.props.rooms_loading ? (
								<OdbioryComponent />
							) : (
								<Loader height={'100%'} />
							)
						) : (
							<ResultsComponent />
						)}
					</div>
				</>
			);
	}
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	rooms_loading: Odbiory.Rooms.rooms_loading,
	awansowanie_is_active: Odbiory.OdbioryComponent.awansowanie.is_active,
	results_is_active: Odbiory.OdbioryComponent.results.is_active,
	sheets_loaded: ForgeViewer.sheets_loaded,
});

const mapDispatchToProps = {
	componentStarted,
	changeActiveTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Odbiory);
