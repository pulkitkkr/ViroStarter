'use strict';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {clearOverlay, setOverlay} from '../../actions/actionCreators'
import {
    ViroARScene,
    ViroText
} from 'react-viro';


class FinalScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : ""
        }
    }
    componentDidMount(){
        // const {sceneNavigator} = this.props;
        const { clearOverlay, setOverlay} = this.props;
         clearOverlay();
        // setOverlay(<NearbyScreenOverlay sceneNavigator={sceneNavigator}/>);
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
const mapDispatchToProps = (dispatch) => {
    return {
        clearOverlay: () => clearOverlay(dispatch),
        setOverlay: content => setOverlay(dispatch, content)

    }
};
export default connect(null, mapDispatchToProps)(FinalScene);