import { createStore } from 'redux';
import rootReducer from '../reducers'
export const getStore = () => {
    return createStore(
        rootReducer
    )
};