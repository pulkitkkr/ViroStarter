import {combineReducers} from 'redux';
import overlayReducer from './overlayReducer';
import locationReducer from './locationReducer'
export default combineReducers({
    overlay: overlayReducer,
    location: locationReducer
});