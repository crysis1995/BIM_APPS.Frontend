import {
    ODBIORY_COMPONENT_STARTED,
    ODBIORY_COMPONENT_ENDED,
    SET_AWANSOWANIE_COMPONENT_ACTIVE,
    SET_RESULTS_COMPONENT_ACTIVE,
} from "./actions";

const initialState = {
    started: false,
    awansowanie: {
        is_active: true,
    },
    results: {
        is_active: false,
    },
};

const OdbioryComponentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ODBIORY_COMPONENT_STARTED:
            return {
                ...state,
                started: true,
            };
        case SET_AWANSOWANIE_COMPONENT_ACTIVE:
            return {
                ...state,
                awansowanie: {
                    ...state.awansowanie,
                    is_active: true,
                },
                results: {
                    ...state.results,
                    is_active: false,
                },
            };

        case SET_RESULTS_COMPONENT_ACTIVE:
            return {
                ...state,
                awansowanie: {
                    ...state.awansowanie,
                    is_active: false,
                },
                results: {
                    ...state.results,
                    is_active: true,
                },
            };
        case ODBIORY_COMPONENT_ENDED:
            return {
                ...state,
                started: true,
            };
        default:
            return state;
    }
};

export default OdbioryComponentReducer;
