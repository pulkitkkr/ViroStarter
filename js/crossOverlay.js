import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import { connect } from "react-redux";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const CrossOverlay = (props) => {
    const { overlayData } = props;
    return(
        <React.Fragment>
            {
                (overlayData && <View style={Styles.OverlayViewContaner}>
                    {
                        overlayData
                    }
                </View>)
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        overlayData: state.overlay.content
    }
};
const Styles = StyleSheet.create({
    OverlayViewContaner: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10000,
        backgroundColor: "#00000000",
        minWidth: width
    }
});
export default connect(mapStateToProps)(CrossOverlay);