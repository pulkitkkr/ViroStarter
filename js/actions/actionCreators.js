import {SET_OVERLAY, CLEAR_OVERLAY} from '../actions'

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

