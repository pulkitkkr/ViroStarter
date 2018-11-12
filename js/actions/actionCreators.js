import {
    SET_OVERLAY,
    CLEAR_OVERLAY,
    SET_INITIAL_POSITION,
    SET_ITERATIVE_POSITION,
    SET_DESTINATION_POSITION,
    CLEAR_INITIAL_POSITION,
    CLEAR_ITERATIVE_POSITION,
    CLEAR_DESTINATION_POSITION,
    SET_SELECTED_PLACE,
    CLEAR_SELECTED_PLACE
} from '../actions'

// Overlay reducers
export const setOverlay = (dispatch, content) => {
    dispatch({
        type: SET_OVERLAY,
        payload: content
    });
};
export const clearOverlay = (dispatch) => {
    dispatch({
        type: CLEAR_OVERLAY
    });
};

// Location Reducer

export const setInitialPosition = (dispatch, content) => {
    dispatch({
        type: SET_INITIAL_POSITION,
        payload: content
    });
};
export const setIterativePosition = (dispatch, content) => {
    dispatch({
        type: SET_ITERATIVE_POSITION,
        payload: content
    });
};
export const setDestinationPosition = (dispatch, content) => {
    dispatch({
        type: SET_DESTINATION_POSITION,
        payload: content
    });
};
export const setSelectedPlace = (dispatch, content) => {
    dispatch({
        type: SET_SELECTED_PLACE,
        payload: content
    });
};
export const clearSelectedPlace = (dispatch) => {
    dispatch({
        type: CLEAR_SELECTED_PLACE
    });
};
export const clearInitialPosition = (dispatch) => {
    dispatch({
        type: CLEAR_INITIAL_POSITION
    });
};
export const clearIterativePosition = (dispatch) => {
    dispatch({
        type: CLEAR_ITERATIVE_POSITION
    });
};
export const clearDestinationPosition = (dispatch) => {
    dispatch({
        type: CLEAR_DESTINATION_POSITION
    });
};