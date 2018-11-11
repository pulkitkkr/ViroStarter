import React from 'react';
import { Text, StatusBar, StyleSheet, ActivityIndicator, View, Image, ScrollView, TouchableNativeFeedback} from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Button, Icon} from 'react-native-elements';
import { Dimensions } from 'react-native';
import {FinalScene} from '../../index';
import {googleMapsAPIKey} from '../../../common/configs';
import axios from 'axios';
import {
    setDestinationPosition
} from "../../../actions/actionCreators";
const { width, height } = Dimensions.get('window');


class NearbyScreenOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearbyPlaces: []
        }
    }
    componentDidMount() {
        const { locationData : {initialPosition} } = this.props;
        const self = this;
        let URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+initialPosition.latitude+","+initialPosition.longitude+"&radius=15000&type=restaurant&keyword=cruise&key=";
        let APIKey = googleMapsAPIKey;
        console.log(URL+APIKey);
        axios.get(URL+APIKey).then((response) => {
           self.setState({ nearbyPlaces: response.data.results});
        });
    }
    onLocationSelect = place => {
        const {setDestinationPosition, sceneNavigator} = this.props;
        let content = {
            longitude: place.geometry.location.lat,
            latitude: place.geometry.location.lng
        };
        setDestinationPosition(content);
        console.log(content);
        sceneNavigator.push({scene: FinalScene});
    };
    render() {
        const { nearbyPlaces} = this.state;
        const { locationData : {initialPosition} } = this.props;
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
                    (nearbyPlaces && nearbyPlaces.length>0) ? (
                        <React.Fragment>
                            <Card titleStyle={styles.cardTitleStyle} containerStyle={styles.cardContainer} title={`${nearbyPlaces.length} Place(s) Found`}>
                            </Card>
                            <ScrollView style={{maxHeight:height*0.7,width:width-30,marginTop:8,marginLeft: 15}}>
                                {
                                    nearbyPlaces.map((place, index)=>(
                                        <TouchableNativeFeedback
                                            key={"Places"+index}
                                            onPress={()=>this.onLocationSelect(place)}
                                            background={TouchableNativeFeedback.SelectableBackground()}
                                        >
                                            <View style={{borderRadius: 8, minWidth:width-32, minHeight:75, marginBottom: 5, opacity: 0.9,padding: 5, flexDirection:'row',backgroundColor:"#ece8e8"}}>
                                                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image source={{uri: place.icon}} style={{width: 30, height: 30}}/>
                                                </View>
                                                <View style={{flex:4,  alignItems: 'flex-start', justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 20, marginLeft: 5}}>{place.name}</Text>
                                                </View>
                                                <View style={{flex:1,  alignItems: 'center', justifyContent: 'center'}}>
                                                    <Icon
                                                        name='chevron-right'
                                                        color='#393a39' />
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))
                                }
                            </ScrollView>

                        </React.Fragment>

                        ) :
                            (
                                <Card titleStyle={styles.cardTitleStyle} containerStyle={styles.cardContainer} title={"Finding Nearby Places"}>
                                    <ActivityIndicator size="large" />
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
export default connect(mapStateToProps, mapDispatchToProps)(NearbyScreenOverlay);