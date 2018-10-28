'use strict';
import React, { Component } from 'react';
import SceneBackground from './assets/Welcomeimage.jpg';
import backgroundSound from './assets/soundbackground.wav';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {
    ViroScene,
    ViroText,
    Viro360Image,
    ViroQuad,
    ViroMaterials,
    ViroSound
} from 'react-viro';

ViroMaterials.createMaterials({
    heart: {
        lightingModel: "Blinn",
        diffuseColor:"red"
        },
});

class WelcomeScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <ViroScene>
                <ViroSound
                source={backgroundSound}
                loop={true} />
                <Viro360Image source={SceneBackground} />
                <ViroQuad
                    position={[0, 0, -3.5]}
                    height={2}
                    width={4}
                >
                </ViroQuad>
                <ViroText text={"Suno Na !! Welcome "} width={2} height={2} position={[0,0.3, -3.4]} style={styles.helloWorldTextStyle} />
            </ViroScene>
        );
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: 'blue',
        textAlignVertical: 'center',
        textAlign: 'center',

    },
    card:{
      color:"blue"
    }
});
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
export default connect(mapStateToProps)(WelcomeScene);