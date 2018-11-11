import React from 'react';
import { Text, View, StatusBar, StyleSheet, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import {
    clearDestinationPosition,
    clearInitialPosition, clearIterativePosition,
    clearOverlay,
    setDestinationPosition,
    setInitialPosition,
    setIterativePosition,
    setOverlay
} from "../../../actions/actionCreators";

class MainScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessGranted: false
        }
    }
    requestLocationPermission = async () => {
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
            } else {
                console.log("Location Permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    componentDidMount = async () => {
        await this.requestLocationPermission();
        const { setInitialPosition, setIterativePosition } = this.props;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = parseFloat(position.coords.latitude);
                const long = parseFloat(position.coords.longitude);
                const initialPosition = {
                    latitude: lat,
                    longitude: long,
                };
                setInitialPosition(initialPosition)();
            },
            (error) => alert(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);
            const iterativePosition ={
                latitude: lat,
                longitude: long,

            };
            setIterativePosition(iterativePosition)();
        });
    };
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
    };
    render() {
        const { locationData } = this.props;
        console.table(this.props);
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
                <View>
                    <Text style = {styles.boldText}>
                        Initial position:
                    </Text>

                    <Text style = {styles.locationText}>
                        {locationData.initialPosition}
                    </Text>

                    <Text style = {styles.boldText}>
                        Current position:
                    </Text>

                    <Text style = {styles.locationText}>
                        {locationData.iterativePosition}
                    </Text>
                </View>
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
    boldText: {
        fontSize: 30,
        color: 'red',
    },
    locationText: {
        fontSize: 18,
        color: '#ffffff',
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenOverlay);