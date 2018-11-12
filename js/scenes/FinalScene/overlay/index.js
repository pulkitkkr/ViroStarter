import React from 'react';
import { Text, StatusBar, StyleSheet, ActivityIndicator, View, Image, ScrollView, TouchableNativeFeedback} from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Button, Icon} from 'react-native-elements';
import { Dimensions } from 'react-native';
import {
    setDestinationPosition
} from "../../../actions/actionCreators";
const { width, height } = Dimensions.get('window');


class FinalScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearbyPlaces: []
        }
    }
    componentDidMount() {

    }
    render() {
        const { nearbyPlaces} = this.state;
        const { locationData : {selectedPlace}, text } = this.props;
        return(
            <React.Fragment>
                <StatusBar
                    backgroundColor="#03a9f4"
                    barStyle="light-content"
                />
                <Header
                    backgroundColor={"#03a9f4"}
                    outerContainerStyles={{marginBottom: -1, elevation: 3}}
                    centerComponent={{ text: 'AR Navigator', style: { color: '#fff', fontSize: 26 } }}
                    rightComponent={{ icon: 'refresh', size: 28, color: '#fff' }}
                />
                {
                    <Card titleStyle={styles.cardTitleStyle} containerStyle={styles.cardContainer} title={`${selectedPlace.name}`}>
                        <Text style = {styles.cardText}>
                            {text}
                        </Text>
                    </Card>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locationData: state.location
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDestinationPosition: content => setDestinationPosition(dispatch, content)
    }
};
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    cardTitleStyle: {
        fontSize: 26,
        color: '#0995ff',
        fontWeight: "400"
    },
    cardContainer: {
        opacity: 0.8,
        borderColor: "#fefefe",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontSize: 18,
        alignSelf: 'center'
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(FinalScreenOverlay);