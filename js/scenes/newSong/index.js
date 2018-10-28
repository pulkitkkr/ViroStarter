'use strict';
import React, { Component } from 'react';
import SceneBackground from './assests/finalbackground.jpg';
import lightSound from './assests/lightsound.mp3';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MaleSelection from "../maleSelection";

import {
    ViroScene,
    ViroText,
    Viro360Image,
    ViroQuad,
    ViroMaterials,
    ViroSound,
    ViroSpotLight
} from 'react-viro';
import {hearVoice, SpeakText} from "../../common/speechUtils";
import {likeOld} from "../../actions/actionCreators";

ViroMaterials.createMaterials({
    heart: {
        lightingModel: "Blinn"
    },
});

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    onSpeechResults = (result)=>{
        const speechResult = result.value;
        let continueFurther = null;
        const self = this;
        speechResult.map(data=>{
            const evalData = data.toLowerCase();
            if(evalData.includes("yes") || evalData.includes("sure") || evalData.includes("yeah")) {
                continueFurther = true;
            } else if(evalData.includes("no") || evalData.includes("nah") || evalData.includes("not")) {
                continueFurther = false;
            }
        })
        console.log(result.value)
        if(continueFurther === null) {
            SpeakText("Sorry; We were not able to understand your voice, so we presume that; just like us, You don't like old songs. ",()=>{
                setTimeout(()=>{
                    self.props.sceneNavigator.push({scene: MaleSelection});
                },800);
                self.props.likeOld(continueFurther)

            });
        } else {
            const mid = continueFurther ? "like" : "don't like";
            SpeakText("Your Selection is noted, that you "+mid+" old songs.",()=>{
                setTimeout(()=>{
                    self.props.sceneNavigator.push({scene: MaleSelection});
                },800);
                self.props.likeOld(continueFurther)

            });
        }
    };
    componentDidMount(){
        setTimeout(()=>{
            SpeakText("Do you feel like; listening to an old song ?? ", ()=> hearVoice({onSpeechResults: this.onSpeechResults}));
        },2800)

    };
    render() {
        const {UserDetails} = this.props;
        return (
            <ViroScene>
                <ViroSpotLight position={[0, 0, 0]}
                               color="#fefefe"
                               direction={[0, 0, -1]}
                               attenuationStartDistance={10}
                               attenuationEndDistance={40}
                               innerAngle={5}
                               outerAngle={45}/>

                <ViroSound
                    source={lightSound}
                    loop={true} />
                <Viro360Image source={SceneBackground} />
                <ViroQuad
                    position={[0, 0, -4.1]}
                    height={2}
                    width={4}
                    materials={["heart"]}
                >
                </ViroQuad>
                <ViroText text={"Do you Feel Like Listening to Old Song ?"} width={2} height={2} position={[0,0, -4.0]} style={styles.helloWorldTextStyle} />
            </ViroScene>
        );
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',

    },
    card:{
        color:"blue"
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        likeOld: (old)=> likeOld(dispatch, old)
    }
}
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
export default connect(mapStateToProps)(MainScreen);