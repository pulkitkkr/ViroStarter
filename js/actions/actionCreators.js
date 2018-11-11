import {
    SET_OVERLAY,
    CLEAR_OVERLAY,
    SET_INITIAL_POSITION,
    SET_ITERATIVE_POSITION,
    SET_DESTINATION_POSITION,
    CLEAR_INITIAL_POSITION,
    CLEAR_ITERATIVE_POSITION,
    CLEAR_DESTINATION_POSITION
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
    console.log("hellooo");
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