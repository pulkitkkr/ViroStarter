import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  ViroScene,
  ViroVideo,
  ViroSceneNavigator,
  ViroMaterials,
  Viro360Video,
  ViroButton,
  ViroImage,
  ViroNode,
  ViroAnimations,
} from 'react-viro';
import getSongs from "../../common/videoUtils";

const buttonSize = 0.25;
const VIDEO_REF = "videoref";

let videos = [];

class Theatre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        videoControlsAnimation:"fadeIn",
        videoPaused: false,
        loopVideo: true,
        videoIndex: 0,
        runAnimation: false,
    }

  }
  componentDidMount() {
      const {Genre, Old, Male} = this.props.UserDetails;
      videos = getSongs(Genre, Male, Old);

      try{
        this.props.sceneNavigator.jump("ViroTheatre", {scene:require('./ViroTheatre')});
      } catch(e){
          console.log("move to 2d error",e)
      }
  }
    _onVideoTapped = ()=>{
        var videoControlsAnimationState = this.state.videoControlsAnimation;
        if (videoControlsAnimationState=="fadeIn"){
            videoControlsAnimationState="fadeOut";
        } else {
            videoControlsAnimationState="fadeIn";
        }

        this.setState({
            videoControlsAnimation:videoControlsAnimationState,
            runAnimation: true,
        });
    };
    _renderVideoControl = ()=>{
        return(
            <ViroNode position={[0,-0.8,0]} opacity={1.0}
                      animation={{name : this.state.videoControlsAnimation, run : this.state.runAnimation, loop : false}} >

                <ViroImage
                    scale={[1.4, 1.2, 1]}
                    position={[0, -0.27,-2.1]}
                    source={require("./res/player_controls_container.png")} />

                <ViroButton
                    position={[-buttonSize-0.1,0,-2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/previous.png")}
                    hoverSource={require("./res/previous_hover.png")}
                    clickSource={require("./res/previous_hover.png")}
                    onClick={this._playPreviousVideo} />

                {this._renderPlayControl()}

                <ViroButton
                    position={[buttonSize+0.1, 0,-2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/skip.png")}
                    hoverSource={require("./res/skip_hover.png")}
                    clickSource={require("./res/skip_hover.png")}
                    onClick={this._playNextVideo} />

            </ViroNode>
        );
    };
    _renderPlayControl=()=>{
        if (this.state.videoPaused){
            return (
                <ViroButton
                    position={[0,0,-2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/play.png")}
                    hoverSource={require("./res/play_hover.png")}
                    clickSource={require("./res/play_hover.png")}
                    transformBehaviors={["billboard"]}
                    onClick={this._togglePauseVideo}/>
            );
        } else {
            return (
                <ViroButton
                    position={[0,0,-2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require("./res/pause.png")}
                    hoverSource={require("./res/pause_hover.png")}
                    clickSource={require("./res/pause_hover.png")}
                    transformBehaviors={["billboard"]}
                    onClick={this._togglePauseVideo}/>
            );
        }
    };
    _launchTheatreScene=()=>{
        this.props.sceneNavigator.jump("ViroTheatre", {scene:require('./ViroTheatre')});
    };
    _togglePauseVideo=()=> {
        this.setState({
            videoPaused: !this.state.videoPaused,
        })
    };
    _playPreviousVideo=()=>{
        var currentVideo = this.state.videoIndex;
        if (currentVideo - 1 > -1){
            this.setState({
                videoIndex: (currentVideo - 1),
                videoPaused: false
            });
        }
    };
    _playNextVideo=()=>{
        var currentVideo = this.state.videoIndex;
        if (currentVideo + 1 < videos.length){
            this.setState({
                videoIndex: (currentVideo + 1),
                videoPaused: false
            });
        }
    }

  render() {
      const sourceString = videos[this.state.videoIndex] ? videos[this.state.videoIndex].src: require('../../common/generic/shapeOfyou.mp4')

      return (
          <ViroScene onClick={this._onVideoTapped} reticleEnabled={this.state.videoControlsAnimation=="fadeIn"}>
              <Viro360Video ref={VIDEO_REF} source={sourceString} volume={1.0}
                            loop={this.state.loopVideo} paused={this.state.videoPaused} />

              {this._renderVideoControl()}

          </ViroScene>
      );
  }
}
ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

const mapStateToProps = (state) => {
    console.log("in connection")
    return {
        UserDetails: state.UserDetails
    }
}

const connectedTheatre = connect(mapStateToProps)(Theatre)

export default connectedTheatre;
