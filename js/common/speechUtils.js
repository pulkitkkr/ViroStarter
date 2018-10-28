import Speech from 'react-native-android-speech';
import Voice from 'react-native-voice';

export const SpeakText = (text, callback=()=>{}) => {
    console.log("Speaking the text");
    try {
        Speech.speak({
            text,
            language : 'en',
            pitch:1.15,
            country : 'IN'
        }).then(()=>{
            console.log("Then started")
            callback()
        })
    } catch(e) {
        console.log(e)
    }

};

export const hearVoice = async ({onSpeechStart= ()=> {console.log("started")}, onSpeechEnd= ()=>{console.log("ended")}, onSpeechResults=()=>{}, onSpeechPartialResults = ()=>{}}) => {

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    let speak = await Speech.isSpeaking();
    while(speak) {
        speak = await Speech.isSpeaking();
    }
    Voice.start('en-IN').then(()=>{
        setTimeout(()=>Voice.stop(), 3000)
    });
};