import React from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";
import { componentStarted } from "../redux/odbiory/actions";
import { fetch_all_rooms, setSelectedRoom } from "../redux/rooms/actions";
import {
    setCurrentLevel,
    selectElement,
} from "../../../components/ForgeViewer/redux/actions";
import Loader from "../../../components/Loader";
import LevelSelectorComponent from "./LevelSelectorComponent";
import { NavLink, Route } from "react-router-dom";
import OdbioryComponent from "./OdbioryComponent";
import ResultsComponent from "./ResultsComponent";
import {
    setAwansowanieActive,
    setResultsActive,
} from "../redux/odbiory/actions";

class odbiory extends React.Component {
    componentDidMount() {
        const { fetch_all_rooms, componentStarted } = this.props;
        componentStarted();
        fetch_all_rooms();
    }

    render() {
        if (this.props.Rooms.rooms_loading) return <Loader />;
        else
            return (
                <>
                    <LevelSelectorComponent />
                    <Nav
                        variant="tabs"
                        className="mt-3"
                        defaultActiveKey={this.props.match.url}
                    >
                        <Nav.Item>
                            <Nav.Link
                                onSelect={(e) =>
                                    this.props.setAwansowanieActive()
                                }
                                eventKey={this.props.match.url}
                            >
                                <NavLink to={this.props.match.url}>
                                    Awansowanie robót
                                </NavLink>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onSelect={(e) => this.props.setResultsActive()}
                                eventKey={`${this.props.match.url}/results`}
                            >
                                <NavLink to={`${this.props.match.url}/results`}>
                                    Rezultaty
                                </NavLink>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Route exact path={`${this.props.match.path}`}>
                        <OdbioryComponent />
                    </Route>
                    <Route path={`${this.props.match.path}/results`}>
                        <ResultsComponent />
                    </Route>
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
    selectElement,
    componentStarted,
    setCurrentLevel,
    fetch_all_rooms,
    setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(odbiory);
