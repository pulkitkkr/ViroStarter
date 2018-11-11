import React from 'react';
import { Text, View, StatusBar, StyleSheet, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Button, Icon} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import {
    clearDestinationPosition,
    clearInitialPosition, clearIterativePosition,
    setDestinationPosition,
    setInitialPosition,
    setIterativePosition
} from "../../../actions/actionCreators";

class MainScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessGranted: false,
            showLoader: true
        }
    }
    requestLocationPermission = async () => {
        const self = this;
        const { setInitialPosition, setIterativePosition } = this.props;
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'MSIT Minor Project AR Location Request',
                    'message': 'We need to access your location' +
                        'so we can find awesome places near you.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the Location Services now");
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position)
                        const lat = parseFloat(position.coords.latitude);
                        const long = parseFloat(position.coords.longitude);
                        const initialPosition = {
                            latitude: lat,
                            longitude: long,
                        };
                        setInitialPosition(initialPosition);
                    },
                    (error) => alert(error.message),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                self.watchID = Geolocation.watchPosition((position) => {
                    const lat = parseFloat(position.coords.latitude);
                    const long = parseFloat(position.coords.longitude);
                    const iterativePosition ={
                        latitude: lat,
                        longitude: long,

                    };
                    setIterativePosition(iterativePosition);
                });

            } else {
                console.log("Location Permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    componentDidMount = async () => {
        const self = this;
        setTimeout(()=>{self.setState({showLoader: false})},5000)
        await this.requestLocationPermission();

    };
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
    };
    render() {
        const { showLoader } = this.state;
        const { locationData : {initialPosition} } = this.props;
        let locationData = initialPosition;
        let initialRegion = {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if(locationData.latitude == ''){
            initialRegion = {
                latitude:  28.621213,
                longitude:  77.092333,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
        console.log("locationData is:",locationData, "Initial  region is: ",initialRegion);
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
                    showLoader ? (
                            <Card titleStyle={styles.cardTitleStyle} containerStyle={styles.cardContainer} title={"Loading"}>
                                <Text style = {styles.cardText}>
                                    Please Wait, While We are trying to get your Geo-Location.
                                </Text>
                            </Card>
                        ) :
                        (
                            <Card
                                titleStyle={styles.mapCardTitleStyle}
                                containerStyle={styles.mapCardContainer}
                                title={"We Found Your Location"}
                            >
                                <View style={{width: width - 60, height: height/2 - 50}}>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={initialRegion}
                                        region = {
                                            initialRegion
                                        }
                                    >
                                        <MapView.Marker.Animated
                                            coordinate={{
                                                latitude: locationData.latitude ? locationData.latitude : 28.621213,
                                                longitude: locationData.longitude ? locationData.longitude : 77.092333,
                                            }}
                                        />
                                    </MapView>
                                </View>
                                <Button
                                    icon={
                                        <Icon
                                            name='arrow-right'
                                            size={15}
                                            color='white'
                                        />
                                    }
                                    buttonStyle={{
                                        backgroundColor: "#03a9f4",
                                        borderRadius: 5,
                                        marginTop: 10
                                    }}
                                    title='Continue'
                                />

                            </Card>
                        )
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
        setInitialPosition: content => setInitialPosition(dispatch, content),
        setIterativePosition: content => setIterativePosition(dispatch, content),
        setDestinationPosition: content => setDestinationPosition(dispatch, content),
        clearInitialPosition: () => clearInitialPosition(dispatch),
        clearIterativePosition: () => clearIterativePosition(dispatch),
        clearDestinationPosition: () => clearDestinationPosition(dispatch)
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
    },
    mapCardTitleStyle: {
        fontSize: 26,
        color: '#0995ff',
        fontWeight: "400"
    },
    mapCardContainer: {
        opacity: 0.8,
        borderColor: "#fefefe",
        borderRadius: 5,
        minWidth: width-50,
        minHeight: height/2,
        marginTop: height/8
    },
    cardText: {
        fontSize: 18,
        alignSelf: 'center'
    },

    boldText: {
        fontSize: 30,
        color: 'red',
    },
    locationText: {
        fontSize: 18,
        color: '#ffffff',
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    }
});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenOverlay);