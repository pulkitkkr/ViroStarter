import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { View, StyleSheet } from 'react-native';
import ARNavigator from './routes';
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
                <React.Fragment>
                    <ARNavigator/>
                    {
                        (<View>

                        </View>)
                    }
                </React.Fragment>
            </Provider>
        )
    }
}
const Styles = StyleSheet.create({
    OverlayViewContaner: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10000
    }
});
