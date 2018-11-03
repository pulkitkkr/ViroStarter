'use strict';
import React, { Component } from 'react';
import SceneBackground from './assests/welcomeBg360.jpg';
import lightSound from './assests/lightsound.mp3';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {
    ViroARScene,
    ViroScene,
    ViroText,
    Viro360Image,
    ViroQuad,
    ViroMaterials,
    ViroSound
} from 'react-viro';
import {hearVoice, SpeakText} from "../../common/speechUtils";

ViroMaterials.createMaterials({
    heart: {
        lightingModel: "Blinn",
        diffuseColor:"red"
    },
});

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
	        text : "Initializing AR..."
        }
    }

    render(){
        return (
		        <ViroARScene >
			        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
		        </ViroARScene>

        );
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontSize: 40,
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
export default connect(mapStateToProps)(MainScreen);