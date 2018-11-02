'use strict';
import React, { Component } from 'react';
import SceneBackground from './assests/welcomeBg360.jpg';
import lightSound from './assests/lightsound.mp3';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import GenreScreen from "../chatSystem";

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
    onSpeechResults = (result)=>{
        const speechResult = result.value;
        let continueFurther = false;

        speechResult.map(data=>{
            const evalData = data.toLowerCase();
            if(evalData.includes("yes") || evalData.includes("sure") || evalData.includes("yeah")) {
                continueFurther = true;
            }
        })
        console.log(result.value)
        if(continueFurther) {
            this.props.sceneNavigator.push({scene: GenreScreen});
        } else {
            alert("Error")
        }
    };
    componentDidMount(){
        setTimeout(()=>{
            SpeakText("Hey!! How are you ?. Welcome to your immersive SoundBox, To Get Started, We Would Love to ask you few questions!! . Please respond to them everytime after the beep sound. Shall we get started ?? ", ()=> hearVoice({onSpeechResults: this.onSpeechResults}));
        },2800)

    };
	_onInitialized=(state, reason)=> {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text : "Hello World!"
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}
}
    render() {
        return (
		        <ViroARScene onTrackingUpdated={this._onInitialized} >
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