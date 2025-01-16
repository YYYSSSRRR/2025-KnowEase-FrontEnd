import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
export default function App() {
  
  return (
    <ImageBackground
      source={require('./bg.png')}
      style={{flex:1,resizeMode:'cover'}}
    >
      <ImageBackground
        source={require('./12320.png')}
        style={{position:'absolute',top:'30%',left:'15%'}}
      > 
      </ImageBackground>
      <Text
        style={{color:'white',position:'absolute',top:'50%',left:'20%',fontSize:'20'
        }}
      >小知，你的校园生活小助手</Text>
    </ImageBackground>



  );
}

