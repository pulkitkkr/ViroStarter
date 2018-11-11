import {
    SET_INITIAL_POSITION,
    SET_ITERATIVE_POSITION,
    SET_DESTINATION_POSITION,
    CLEAR_INITIAL_POSITION,
    CLEAR_ITERATIVE_POSITION,
    CLEAR_DESTINATION_POSITION
} from '../actions'

const initialState = {
    initialPosition: '',
    iterativePosition: '',
    destinationPosition: '',
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_POSITION:
            return {
                ...state,
                initialPosition: action.payload
            };
        case SET_ITERATIVE_POSITION:
            return {
                ...state,
                iterativePosition: action.payload
            };
        case SET_DESTINATION_POSITION:
            return {
                ...state,
                destinationPosition: action.payload
            };
        case CLEAR_INITIAL_POSITION:
            return {
                ...state,
                initialPosition: ''
            };
        case CLEAR_ITERATIVE_POSITION:
            return {
                ...state,
                iterativePosition: ''
            };
        case CLEAR_DESTINATION_POSITION:
            return {
                ...state,
                destinationPosition: ''
            };
        default:
            return state;
    }
};
export default locationReducer;