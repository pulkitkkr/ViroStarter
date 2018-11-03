import React from 'react';
import {Text, View, StatusBar, StyleSheet, PermissionsAndroid} from 'react-native'
import { Header } from 'react-native-elements'

class MainScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        }
    }

 requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Cool Photo App Camera Permission',
                'message': 'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}
    componentDidMount = async () => {
        await this.requestCameraPermission();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const initialPosition = JSON.stringify(position);
                this.setState({ initialPosition });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 2000000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lastPosition = JSON.stringify(position);
            this.setState({ lastPosition });
        });
    }
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
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
                        {this.state.initialPosition}
                    </Text>

                    <Text style = {styles.boldText}>
                        Current position:
                    </Text>

                    <Text style = {styles.locationText}>
                        {this.state.lastPosition}
                    </Text>
                </View>

            </React.Fragment>
        );
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
})
export default MainScreenOverlay;