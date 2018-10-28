'use strict';
import React, { Component } from 'react';
import SceneBackground from './assests/genderbackground.jpg';
import lightSound from './assests/lightsound.mp3';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Theatre from "../ViroMediaPlayer/ViroTheatre";


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
import {likeMale} from "../../actions/actionCreators";

ViroMaterials.createMaterials({
    heart: {
        lightingModel: "Blinn"
    },
});

class MaleSelection extends React.Component {

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

            SpeakText("Sorry; We were not able to understand your voice, so we presume that; just like us, You would love the female voice. ",()=>{
                self.props.likeMale(continueFurther)
                setTimeout(()=>{
                    self.props.sceneNavigator.push({scene: Theatre});
                },800);

            });
        } else {
            const mid = continueFurther ? "male" : "female";
            SpeakText("Got it;!! You ewould love to listen in; "+mid+" voice",()=>{

                self.props.likeMale(continueFurther)
                setTimeout(()=>{
                    self.props.sceneNavigator.push({scene: Theatre});
                },800);

            });
        }
    };
    componentDidMount(){
        setTimeout(()=>{
            SpeakText("One Last Question.. Would you like to listen,  to a male singer?? ", ()=> hearVoice({onSpeechResults: this.onSpeechResults}));
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
                <ViroText text={"How about listening to a male singer ? ?"} width={2} height={2} position={[0,0, -4.0]} style={styles.helloWorldTextStyle} />
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
        likeMale: (old)=> likeMale(dispatch, old)
    }
}
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MaleSelection);