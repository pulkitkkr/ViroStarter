import React from 'react';
import { Text, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Button, Icon} from 'react-native-elements';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


class NearbyScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { locationData : {initialPosition} } = this.props;
        const {sceneNavigator} = this.props;
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
                <Card titleStyle={styles.cardTitleStyle} containerStyle={styles.cardContainer} title={"Nearby Places"}>
                    <Text style = {styles.cardText}>
                        Please Wait, While We are trying to get Places Near You.
                    </Text>
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locationData: state.location
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
    cardText: {
        fontSize: 18,
        alignSelf: 'center'
    },
});
export default connect(mapStateToProps)(NearbyScreenOverlay);