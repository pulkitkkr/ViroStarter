import {ADD_GENRE, LIKE_OLD, LIKE_MALE} from '../actions'

const initialState = {

    Genre:"Instrumental",
     Old:false,
    Male:false
};

const UserDetailsReducer = (state = initialState, action) => {
    console.log("received Action", action);
    switch (action.type) {
        case ADD_GENRE:
            return {
                ...state,
                Genre: action.payload
            };
        case LIKE_OLD:
            return {
                ...state,
                Old: action.payload
            };
        case LIKE_MALE:
            return {
                ...state,
                Male: action.payload
            }
        default:
            return state;
    }
};
export default UserDetailsReducer;