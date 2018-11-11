import React, { Component } from 'react';
import { Provider } from 'react-redux'
import ARNavigator from './routes';
import {getStore} from './store';
import CrossOverlay from './crossOverlay';

console.disableYellowBox = true;
const store = getStore();

export default class MainApp extends  Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <Provider store={store}>
                <React.Fragment>
                    <ARNavigator/>
                    <CrossOverlay/>
                </React.Fragment>
            </Provider>
        )
    }
}
