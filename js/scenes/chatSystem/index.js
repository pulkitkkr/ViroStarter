'use strict';
import React, { Component } from 'react';
import SceneBackground from './assets/chatSystemBg360.jpg'
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SpeakText, hearVoice} from '../../common/speechUtils';
import {addGenre} from '../../actions/actionCreators';
import NewSong from '../newSong';
import lightSound from './assets/lightsound.mp3';


import {
    ViroScene,
    ViroText,
    Viro360Image,
    ViroQuad,
    ViroMaterials,
    ViroSpotLight,
    ViroSound
} from 'react-viro';

ViroMaterials.createMaterials({
    heart: {
        lightingModel: "Blinn"
    },
});

class ChatSystem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: props.UserDetails.Genre
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps);
        return {
            ...prevState,
            answer: nextProps.UserDetails.Genre
        }
    }
    onSpeechResults = (result)=>{
        const speechResult = result.value;
        let continueFurther = false;
        const self = this;
        console.log(speechResult);
        speechResult.map(data=>{
            const evalData = data.toLowerCase();
            console.log("evalData is", evalData);
            if(!continueFurther && (evalData.includes("one") || evalData.includes("1")) ) {
                continueFurther = "Jazz";
            } else if(!continueFurther && (evalData.includes("two") || evalData.includes("2"))){
                continueFurther = "Instrumental";
            } else if(!continueFurther && (evalData.includes("three") || evalData.includes("3"))){
                continueFurther = "Soul";
            } else if(!continueFurther && (evalData.includes("four") || evalData.includes("4"))){
                continueFurther = "Rock";
            } else {

            }
        });
        if(continueFurther) {
            SpeakText("Great You Selected;"+continueFurther,()=>{
                self.props.addGenre(continueFurther)
                setTimeout(()=>{
                    self.props.sceneNavigator.push({scene: NewSong});
                },800);
            });
        } else {
            SpeakText("Unfortunately,; We were not able to recognize your voice; We'll!! continue with Rock as selection",
                ()=> {
                    self.props.addGenre("Rock");
                    setTimeout(()=>{
                        self.props.sceneNavigator.push({scene: NewSong});
                    },800);
                }
            );

        }
    };
    componentDidMount(){
        setTimeout(()=>{
            SpeakText("It's time, to choose your favourite Genre; Please say the number; Corresponding to your genre of choice !!", ()=> hearVoice({onSpeechResults: this.onSpeechResults}));
        },2800)

    };
    render() {
        const {answer} = this.state;
        return (
            <ViroScene>
                <ViroSound
                    source={lightSound}
                    loop={true} />
                <ViroSpotLight position={[0, 0, 0]}
                               color="#fefefe"
                               direction={[0, 0, -1]}
                               attenuationStartDistance={10}
                               attenuationEndDistance={40}
                               innerAngle={5}
                               outerAngle={45}/>
                <Viro360Image source={SceneBackground} />
                <ViroQuad
                    position={[0, 0, -4.1]}
                    height={2}
                    width={3}
                    materials={["heart"]}
                />
                <ViroQuad
                    position={[-2.95, 0, -4.1]}
                    height={0.5}
                    width={2}
                />
                <ViroQuad
                    position={[0, 1.5, -4.1]}
                    height={0.5}
                    width={2}
                />

                <ViroQuad
                    position={[0, -1.5, -4.1]}
                    height={0.5}
                    width={2}
                />
                <ViroQuad
                    position={[2.75, 0, -4.1]}
                    height={0.5}
                    width={2}
                />
                <ViroText text={answer ?  answer: "Say One, Two, Three or Four"} width={2} height={2} position={[0, 0, -4.0]} style={styles.helloWorldTextStyle} />
                <ViroText text={"1 Jazz"} width={2} height={2} position={[-2.95, -0.1, -4.0]} style={styles.genreTextStyle} />
                <ViroText text={"2 Instrumental"} width={2} height={2} position={[0, 1.4, -4.0]} style={styles.genreTextStyle} />
                <ViroText text={"3 Soul"} width={2} height={2} position={[2.75, -0.1, -4.0]} style={styles.genreTextStyle} />
                <ViroText text={"4 Rock"} width={2} height={2} position={[0, -1.6, -4.0]} style={styles.genreTextStyle} />

            </ViroScene>
        );
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    genreTextStyle:{
        fontFamily: 'Arial',
        fontSize: 28,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',

    }
});
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addGenre: (genre)=> addGenre(dispatch, genre)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatSystem);