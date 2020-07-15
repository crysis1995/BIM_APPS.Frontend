import { HIDE_MODAL, SHOW_MODAL, SET_MODAL_DATA } from "./actions";

const initialState = {
    modal_visible: false,
    title: "",
    body: "",
};

const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                modal_visible: true,
            };
        case HIDE_MODAL:
            return {
                ...state,
                modal_visible: false,
            };
        case SET_MODAL_DATA:
            return {
                ...state,
                title: action.title,
                body: action.body,
            };
        default:
            return state;
    }
};

export default ModalReducer;
