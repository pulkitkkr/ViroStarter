'use strict';
import React, { Component } from 'react';
import {
    clearDestinationPosition,
    clearInitialPosition, clearIterativePosition,
    clearOverlay, setDestinationPosition, setInitialPosition, setIterativePosition,
    setOverlay
} from '../../actions/actionCreators';
import {StyleSheet} from 'react-native';
import NearbyScreenOverlay from './overlay';
import {connect} from 'react-redux';

import {
    ViroARScene,
    ViroText
} from 'react-viro';


class NearbyPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : "AR LIST NEARBY"
        }
    }
    componentDidMount(){
        const {sceneNavigator} = this.props;
        const { clearOverlay, setOverlay} = this.props;
        clearOverlay();
        setOverlay(<NearbyScreenOverlay sceneNavigator={sceneNavigator}/>);
    }
    render(){
        console.log("In NearBy Places")
        return (
            <ViroARScene>
                <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            </ViroARScene>

        );
    }

}
const styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontSize: 40,
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        clearOverlay: () => clearOverlay(dispatch),
        setOverlay: content => setOverlay(dispatch, content)

    }
};
export default connect(null, mapDispatchToProps)(NearbyPlaces);