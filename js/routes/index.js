import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import {MainScreen} from '../scenes';
import {viroAPIKeys} from '../common/configs'

export default class ARNavigator extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ViroARSceneNavigator apiKey={viroAPIKeys}
                initialScene={{
                    scene:MainScreen
                }}
            />
        )
    }
}