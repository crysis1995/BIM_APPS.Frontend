import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { fetch_all_rooms } from "../redux/rooms/actions";
import Loader from '../../../components/Loader';
import { componentStarted, setAwansowanieActive, setResultsActive } from '../redux/odbiory/actions';
import LevelSelectorComponent from './LevelSelectorComponent';
import OdbioryComponent from './OdbioryComponent';
import ResultsComponent from './ResultsComponent';


class Odbiory extends React.Component {
    componentDidMount() {
        const { componentStarted } = this.props;
        componentStarted();
    }

    render() {
        if (!this.props.ForgeViewer.sheets_loaded) return <Loader />;
        else
            return (
                <>
                    <div className="d-flex flex-column p-3 w-100">
                        <LevelSelectorComponent />
                        <Nav variant="tabs" className="mt-3" defaultActiveKey={this.props.match.url}>
                            <Nav.Item>
                                <Nav.Link
                                    onSelect={(e) => this.props.setResultsActive()}
                                    eventKey={this.props.match.url}
                                >
                                    Rezultaty
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    onSelect={(e) => this.props.setAwansowanieActive()}
                                    eventKey={`${this.props.match.url}/upgrade`}
                                >
                                    Awansowanie robót
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        {this.props.OdbioryComponent.awansowanie.is_active ? (
                            <OdbioryComponent />
                        ) : (
                            <ResultsComponent />
                        )}
                    </div>
                </>
            );
    }
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {
    setAwansowanieActive,
    setResultsActive,
    componentStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(Odbiory);
