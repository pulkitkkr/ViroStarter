'use strict';
import React, { Component } from 'react';
// import lightSound from './assests/lightsound.mp3';
import ListOfImages from '../../common/ThemeImages/images.js';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import GenreScreen from "../chatSystem";

import {
    ViroScene,
    ViroText,
    Viro360Image,
    ViroQuad,
    ViroSound,
} from 'react-viro';

class PlayersScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songFinals:this.props.UserDetails,
        }
    }

    componentDidMount=()=>{
        let genreForSong=this.state.songFinals.Genre;
        let oldSongs=this.state.songFinals.Old===true ? "2010s":"1990s";
        let singerVoice=this.state.songFinals.Male===true ? "Male" : "Female";
        // this.props.getMusicList(genreForSong,oldSongs,singerVoice);

    }
    componentWillReceiveProps(nextProps){
        console.log("received new props")
        this.setState({songFinals:nextProps.UserDetails})
    }
    getUrl=()=>{
        console.log("from props genre",this.state.songFinals.Genre);
        console.log("list is",ListOfImages);
        let genreHere=this.state.songFinals.Genre;
        ListOfImages.map((ind)=>{
            if(ind.genre===genreHere){
                return ind.imageSource;
            }
        })
    }


    render() {
        console.log("props are",this.state.songFinals);
        const {UserDetails} = this.props;
        return (
            <ViroScene>
                {/*<ViroSound*/}
                    {/*source={lightSound}*/}
                    {/*loop={true} />*/}
                <Viro360Image source={this.getUrl()} />
                <ViroQuad
                    position={[0, 0, -4.1]}
                    height={2}
                    width={4}
                >
                </ViroQuad>
                <ViroText text={"Welcome "+UserDetails.Genre} width={2} height={2} position={[0,0.3, -3.4]} style={styles.helloWorldTextStyle} />
            </ViroScene>
        );
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: 'blue',
        textAlignVertical: 'center',
        textAlign: 'center',

    },
    card:{
        color:"blue"
    }
});
const mapStateToProps = (state) => {
    return {
        UserDetails: state.UserDetails
    }
}
export default connect(mapStateToProps)(PlayersScreen);