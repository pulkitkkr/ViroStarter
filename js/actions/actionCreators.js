import {ADD_GENRE, LIKE_OLD, LIKE_MALE} from '../actions'

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