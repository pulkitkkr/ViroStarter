
'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import getSongs from '../../common/videoUtils';
import {
    AppRegistry,
    ViroScene,
    ViroVideo,
    ViroSceneNavigator,
    ViroMaterials,
    Viro360Image,
    ViroButton,
    ViroImage,
    ViroNode,
    ViroAnimations,
    ViroUtils,
} from 'react-viro';

var createReactClass = require('create-react-class');


ViroAnimations.registerAnimations({
    fadeOut:{properties:{opacity: 0.0}, duration: 500},
    fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

ViroMaterials.createMaterials({
    opaqueWhite: {
        shininess: 2.0,
        lightingModel: "Lambert",
        diffuseColor: "#FFFFFF"
    },
});
const buttonSize = 0.25;
const VIDEO_REF = "videoref";
const VideoControlRef = "VideoControlRef";

let videos = [];

class ViroTheatre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoControlsAnimation: "fadeIn",
            videoPaused: false,
            loopVideo: true,
            videoIndex: 0,
            runAnimation: false,
        }
        const {Genre, Old, Male} = props.UserDetails;
        videos = getSongs(Genre, Male, Old);
    }

    _onVideoTapped = () => {
        let videoControlsAnimationState = this.state.videoControlsAnimation;
        if (videoControlsAnimationState == "fadeIn") {
            videoControlsAnimationState = "fadeOut";
        } else {
            videoControlsAnimationState = "fadeIn";
        }

        this.setState({
            videoControlsAnimation: videoControlsAnimationState,
            runAnimation: true,
        });
    }
    _renderVideoControl = () => {
        return (
            <ViroNode position={[0, -0.8, 0]} opacity={1.0}
                      animation={{name: this.state.videoControlsAnimation, run: this.state.runAnimation, loop: false}}>
                <ViroImage
                    scale={[1.4, 1.2, 1]}
                    position={[0, -0.27, -2.1]}
                    source={require("./res/player_controls_container.png")}/>

                <ViroButton
                    position={[-buttonSize - 0.1, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/previous.png")}
                    hoverSource={require("./res/previous_hover.png")}
                    clickSource={require("./res/previous_hover.png")}
                    onHover={this._playPreviousVideo}/>

                {this._renderPlayControl()}

                <ViroButton
                    position={[buttonSize + 0.1, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/skip.png")}
                    hoverSource={require("./res/skip_hover.png")}
                    clickSource={require("./res/skip_hover.png")}
                    onHover={this._playNextVideo}/>

            </ViroNode>
        );
    }
    _renderPlayControl = () => {
        if (this.state.videoPaused) {
            return (
                <ViroButton
                    position={[0, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/play.png")}
                    hoverSource={require("./res/play_hover.png")}
                    clickSource={require("./res/play_hover.png")}
                    onHover={this._togglePauseVideo}/>
            );
        } else {
            return (
                <ViroButton
                    position={[0, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/pause.png")}
                    hoverSource={require("./res/pause_hover.png")}
                    clickSource={require("./res/pause_hover.png")}
                    onHover={this._togglePauseVideo}/>
            );
        }
    }
    _togglePauseVideo = () => {
        this.setState({
            videoPaused: !this.state.videoPaused,
        })
    }
    _playPreviousVideo = () => {
        var currentVideo = this.state.videoIndex;
        if (currentVideo - 1 > -1) {
            this.setState({
                videoIndex: (currentVideo - 1),
                videoPaused: false
            });
        }
    }
    _playNextVideo = () => {
        var currentVideo = this.state.videoIndex;
        if (currentVideo + 1 < videos.length) {
            this.setState({
                videoIndex: (currentVideo + 1),
                videoPaused: false
            });
        }
    }

    render() {
        const sourceString = videos[this.state.videoIndex] ? videos[this.state.videoIndex] : '../../common/generic/shapeOfyou.mp4';

        return (
            <ViroScene onClick={this._onVideoTapped} reticleEnabled={this.state.videoControlsAnimation == "fadeIn"}>
                <Viro360Image source={require('./res/dark_theatre.jpg')}/>
                <ViroVideo ref={VIDEO_REF} source={sourceString} volume={1.0}
                           position={[0, 3.9, -45]} scale={[44, 22, 1]} loop={this.state.loopVideo}
                           paused={this.state.videoPaused}/>

                {this._renderVideoControl()}

            </ViroScene>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}

const connectedViroTheatre = connect(mapStateToProps)(ViroTheatre)
module.exports = connectedViroTheatre;
