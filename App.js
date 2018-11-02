import React, {Component} from 'react';
import ARNavigator from './js';
import Provider from "react-redux/es/components/Provider";

export default class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ARNavigator/>
        )
    }
};