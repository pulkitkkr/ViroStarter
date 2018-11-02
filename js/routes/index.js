import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import {WelcomeScene, ChatSystem, ToastScreen, MainScreen, NewSong, Theatre, MaleSelection} from '../scenes';
import {viroAPIKeys} from '../common/configs'
import PlayersScreen from "../scenes/Players/PlayersScreen";

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