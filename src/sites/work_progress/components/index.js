import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { componentStarted, changeActiveTab } from '../redux/actions/odbiory_actions';
import LevelSelectorComponent from './LevelSelectorComponent';
import OdbioryComponent from './OdbioryComponent';
import ResultsComponent from './Results';
import TermsComponent from './Terms';
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
				case CONSTANTS.PROGRESS === this.props.active_tab && !this.props.rooms_loading:
					component = <OdbioryComponent />;
					break;
				case CONSTANTS.RESULTS === this.props.active_tab:
					component = <ResultsComponent />;
					break;
				case CONSTANTS.TERMS === this.props.active_tab:
					component = <TermsComponent />;
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
									active={CONSTANTS.RESULTS === this.props.active_tab}
									onSelect={(e) =>
										CONSTANTS.RESULTS !== this.props.active_tab && this.props.changeActiveTab(e)
									}
									eventKey={CONSTANTS.RESULTS}>
									Rezultaty
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									active={CONSTANTS.PROGRESS === this.props.active_tab}
									onSelect={(e) =>
										CONSTANTS.PROGRESS !== this.props.active_tab && this.props.changeActiveTab(e)
									}
									eventKey={CONSTANTS.PROGRESS}>
									Awansowanie robót
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									active={CONSTANTS.TERMS === this.props.active_tab}
									onSelect={(e) =>
										CONSTANTS.TERMS !== this.props.active_tab && this.props.changeActiveTab(e)
									}
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
	active_tab: Odbiory.OdbioryComponent.active_tab,
	sheets_loaded: ForgeViewer.sheets_loaded,
});

const mapDispatchToProps = {
	componentStarted,
	changeActiveTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Odbiory);
