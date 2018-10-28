import React, { Component } from 'react';
import { Provider } from 'react-redux'

import VRNavigator from './routes';
import {getStore} from './store';
console.disableYellowBox = true;
const store = getStore();
export default class MainApp extends  Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <Provider store={store}>
                <VRNavigator/>
            </Provider>
        )
    }
}
