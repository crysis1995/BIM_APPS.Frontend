import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { componentStarted, changeActiveTab } from '../redux/actions/odbiory_actions';
import LevelSelectorComponent from './LevelSelectorComponent';
import OdbioryComponent from './OdbioryComponent';
import ResultsComponent from './Results';
import Tools from './Tools';
import { CONSTANTS } from '../redux/types/constans';
class Odbiory extends React.Component {
	componentDidMount() {
		const { componentStarted } = this.props;
		componentStarted();
	}

	render() {
		if (!this.props.sheets_loaded) return <Loader />;
		else {
			let component;
			switch (true) {
				case CONSTANTS.TERMS ===  && !this.props.rooms_loading:
					component = <OdbioryComponent />;
					break;
				case this.props.results_is_active:
					component = <ResultsComponent />;
					break;
				default:
					component = <Loader height={'100%'} />;
					break;
			}
			return (
				<>
					<div className="d-flex flex-column p-3 w-100">
						<Tools />
						<LevelSelectorComponent />
						<Nav variant="tabs" className="mt-3" defaultActiveKey={'results'}>
							<Nav.Item>
								<Nav.Link
									onSelect={(e) => this.props.awansowanie_is_active && this.props.changeActiveTab(e)}
									eventKey={CONSTANTS.RESULTS}>
									Rezultaty
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									onSelect={(e) => this.props.results_is_active && this.props.changeActiveTab(e)}
									eventKey={CONSTANTS.PROGRESS}>
									Awansowanie robót
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									onSelect={(e) => this.props.terms_is_active && this.props.changeActiveTab(e)}
									eventKey={CONSTANTS.TERMS}>
									Terminy
								</Nav.Link>
							</Nav.Item>
						</Nav>
						{component}
					</div>
				</>
			);
		}
	}
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	rooms_loading: Odbiory.Rooms.rooms_loading,
	awansowanie_is_active: Odbiory.OdbioryComponent.awansowanie.is_active,
	results_is_active: Odbiory.OdbioryComponent.results.is_active,
	date_is_active: Odbiory.OdbioryComponent.date.is_active,
	sheets_loaded: ForgeViewer.sheets_loaded,
});

const mapDispatchToProps = {
	componentStarted,
	changeActiveTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Odbiory);
