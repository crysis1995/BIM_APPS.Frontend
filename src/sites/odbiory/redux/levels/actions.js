export const SET_CURRENT_LEVEL = "SET_CURRENT_LEVEL";

const _setCurrentLevel = (current_level) => ({
    type: SET_CURRENT_LEVEL,
    current_level,
});

export const setCurrentLevel = (current_level) => async (dispatch, getState) => {
    dispatch(_setCurrentLevel(current_level));
};
