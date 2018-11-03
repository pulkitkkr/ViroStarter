import {ADD_GENRE, LIKE_OLD, LIKE_MALE, SET_OVERLAY, CLEAR_OVERLAY} from '../actions'

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

export const addGenre = (dispatch, genre) => {
    console.log("Dispatching", genre);
    dispatch({
        type: ADD_GENRE,
        payload: genre
    });
};
export const likeOld = (dispatch, old) => {
    console.log("Dispatching", old);
    dispatch({
        type: LIKE_OLD,
        payload: old
    });
}
export const likeMale = (dispatch, male) => {
    console.log("Dispatching", male);
    dispatch({
        type: LIKE_MALE,
        payload: male
    });
};