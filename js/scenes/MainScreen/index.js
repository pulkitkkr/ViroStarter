'use strict';
import React, { Component } from 'react';
import { clearOverlay, setOverlay } from '../../actions/actionCreators';
import {StyleSheet, View, Text} from 'react-native';
import MainScreenOverlay from './overlays';
import {connect} from 'react-redux';

import {
    ViroARScene,
    ViroText,
    ViroMaterials
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
    componentDidMount(){
        const { clearOverlay, setOverlay} = this.props;
        clearOverlay();
        setOverlay(<MainScreenOverlay/>);
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
const mapDispatchToProps = (dispatch) => {
  return {
      clearOverlay: () => clearOverlay(dispatch),
      setOverlay: (content) => setOverlay(dispatch, content)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);