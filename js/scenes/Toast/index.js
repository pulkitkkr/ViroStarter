import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import {
    ViroScene,
    ViroText,
} from 'react-viro';


 class ToastScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ViroScene>
                {/*<TouchableHighlight*/}
                    {/*style={{padding: 10}}*/}
                    {/*onPress={()=>{*/}
                        {/*this.refs.toast.show('hello world!',DURATION.LENGTH_LONG);*/}
                    {/*}}>*/}
                    {/*<Text>Press me</Text>*/}
                {/*</TouchableHighlight>*/}
                {/*<Toast*/}
                    {/*ref="toast"*/}
                    {/*style={{backgroundColor:'red'}}*/}
                    {/*position='top'*/}
                    {/*positionValue={200}*/}
                    {/*fadeInDuration={750}*/}
                    {/*fadeOutDuration={1000}*/}
                    {/*opacity={0.8}*/}
                    {/*textStyle={{color:'red'}}*/}
                {/*/>*/}
            </ViroScene>
        );
    }
}
export default ToastScreen;