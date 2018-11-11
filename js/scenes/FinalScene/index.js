'use strict';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FinalScreenOverlay from './overlay'
import {clearOverlay, setOverlay} from '../../actions/actionCreators'
import {
    ViroARScene,
    ViroText
} from 'react-viro';
import RNSimpleCompass from 'react-native-simple-compass';

const degree_update_rate = 3; // Number of degrees changed before the callback is triggered

class FinalScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : "Final Screen"
        }
    }
    angleFromCoordinate(lat1, long1, lat2,long2) {
        const dLon = (long2 - long1);
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = ((Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2))) * Math.cos(dLon);

        let  brng = Math.atan2(y, x);

        brng = brng * (180 / Math.PI);
        brng = (brng + 360) % 360;
        brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise
        return brng;
    }
    componentDidMount(){
        const {sceneNavigator} = this.props;
        const { clearOverlay, setOverlay, locationData} = this.props;
         clearOverlay();
         setOverlay(<FinalScreenOverlay sceneNavigator={sceneNavigator}/>);

         const { initialPosition, destinationPosition } = locationData;
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            console.log('You are facing', degree);
            console.log(this.angleFromCoordinate(initialPosition.latitude, initialPosition.longitude, destinationPosition.latitude, destinationPosition.longitude));
            // RNSimpleCompass.stop();
        });

    }
    render(){
         console.log("In FinalScene..")
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
const mapStateToProps = (state) => {
    return {
        locationData: state.location
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearOverlay: () => clearOverlay(dispatch),
        setOverlay: content => setOverlay(dispatch, content)

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalScene);