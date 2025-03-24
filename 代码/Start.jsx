import { StyleSheet, Text, View,ImageBackground,Image,Pressable,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window');
export default function Start(){
    const navigation = useNavigation()//只能在函数组件中使用！返回navigation对象，有navigate,goBack,push方法
    return(
      <ImageBackground
        source={require('../图片/bg.png')}
        style={{flex:1,width:'100%',height:'100%'}}
      >
        <View 
          style={{display:'flex',alignItems:'center',marginTop:height*0.25}}
        >
          <Image
            source={require('../图片/logofinal.png')}
            style={{width:width*0.3,height:height*0.14,marginBottom:height*0.06}}
          ></Image>
          <Text
            style={{color:'white',fontSize:width*0.05,textAlign:'center',letterSpacing:width*0.015
            }}
          >小知，你的校园生活小助手</Text>
        </View>
        <View
          style={{display:'flex',alignItems:'center',marginTop:height*0.3}}
        >
          <Pressable
            style={{backgroundColor:'#69B09C',width:width*0.7,height:height*0.06,borderRadius:10,marginBottom:height*0.01}}
            onPress={()=>{navigation.navigate('Login')}}
          >
            <Text
              style={{lineHeight:height*0.06,textAlign:'center',color:'white',fontSize:20}}
            >立即登录</Text>
          </Pressable>
          <Pressable
            onPress={()=>{navigation.navigate('Register')}}
          >
            <Text
              style={{color:'white',fontSize:height*0.016}}
            >还没有账号?去注册</Text>
          </Pressable>
        </View>
      </ImageBackground>
    )
  }