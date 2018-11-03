import {SET_OVERLAY, CLEAR_OVERLAY} from '../actions'

const initialState = {
    content: null
};

const overlayReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OVERLAY:
            return {
                ...state,
                content: action.payload
            };
        case CLEAR_OVERLAY:
            return {
                ...state,
                content: null
            };
        default:
            return state;
    }
};
export default overlayReducer;