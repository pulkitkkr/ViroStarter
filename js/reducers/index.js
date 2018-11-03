import {combineReducers} from 'redux';
import UserDetailsReducer from './UserDetailsReducer'
import overlayReducer from './overlayReducer';
export default combineReducers({
    UserDetails: UserDetailsReducer,
    overlay: overlayReducer
});