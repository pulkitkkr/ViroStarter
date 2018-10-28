import {combineReducers} from 'redux';
import UserDetailsReducer from './UserDetailsReducer'
export default combineReducers({
    UserDetails: UserDetailsReducer
});