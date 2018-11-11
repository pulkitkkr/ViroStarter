'use strict';
import React, { Component } from 'react';
import {
    clearOverlay,
    setOverlay,
    setInitialPosition,
    setDestinationPosition,
    setIterativePosition,
    clearInitialPosition,
    clearIterativePosition,
    clearDestinationPosition
} from '../../actions/actionCreators';
import {StyleSheet, View, Text} from 'react-native';
import MainScreenOverlay from './overlays';
import {connect} from 'react-redux';

import {
    ViroARScene,
    ViroText,
    ViroMaterials
} from 'react-viro';

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
		        <ViroARScene>
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
const mapDispatchToProps = (dispatch) => {
  return {
      clearOverlay: () => clearOverlay(dispatch),
      setOverlay: content => setOverlay(dispatch, content),
      setInitialPosition: content => setInitialPosition(dispatch, content),
      setIterativePosition: content => setIterativePosition(dispatch, content),
      setDestinationPosition: content => setDestinationPosition(dispatch, content),
      clearInitialPosition: () => clearInitialPosition(dispatch),
      clearIterativePosition: () => clearIterativePosition(dispatch),
      clearDestinationPosition: () => clearDestinationPosition(dispatch)
  }
};
export default connect(null, mapDispatchToProps)(MainScreen);