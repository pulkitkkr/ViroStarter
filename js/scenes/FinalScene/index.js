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
            text : "Final Screen",
            difference: -1
        }
    }
    findDirection(destinationAngle, positionAngle) {
        let difference = positionAngle - destinationAngle;
        let text = ""
        if(difference < 180 && difference > 0) {
            text = "turn Left by "+parseFloat(difference).toFixed(2)+" degrees";
        } else if (difference > 180 && difference < 360) {
            text = "turn Right by "+ parseFloat(360-difference).toFixed(2) +" degrees";
        } else if (difference<0){
            if(difference>-180){
                text = "turn Right by "+ parseFloat(-difference).toFixed(2) +" degrees";
            } else {
                text = "turn Left by "+parseFloat(360+difference).toFixed(2)+" degrees";
            }

        } else {
            text = "Error: Difference is"+parseFloat(difference).toFixed(2);
        }
        let flag = false;
        if(difference<9 && difference>-9){
            text="Head Straight, You will Reach your Destination";
            flag = true;
        }
        if(flag) {
            this.setState({text, difference: 0});
        } else {
            this.setState({text, difference: difference});
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
         setOverlay(<FinalScreenOverlay text={""} sceneNavigator={sceneNavigator}/>);

         const { initialPosition, destinationPosition } = locationData;
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            console.log('You are facing', degree);
            const destAngle = this.angleFromCoordinate(initialPosition.latitude, initialPosition.longitude, destinationPosition.latitude, destinationPosition.longitude);
            this.findDirection(destAngle, degree);
            console.log(destAngle);
            // RNSimpleCompass.stop();
        });

    }
    render(){
         const {text, difference} =this.state;
         const { clearOverlay, setOverlay, sceneNavigator } = this.props
        clearOverlay();
        setOverlay(<FinalScreenOverlay text={text} sceneNavigator={sceneNavigator}/>);
        if(difference ==0) {
            console.log("Rendering 0000000")
            return (
                <ViroARScene>
                    <ViroText text={"Go Here"} scale={[.5, .5, .5]} position={[-5, 0, -1]} style={styles.helloWorldTextStyle} />
                </ViroARScene>

            );
        } else {

            return (
                <ViroARScene>
                    <ViroText text={""} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
                </ViroARScene>

            );
        }
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