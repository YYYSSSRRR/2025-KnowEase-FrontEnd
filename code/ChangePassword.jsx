import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window')

const styles=StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        marginTop:height*0.15
    },
    input:{
        borderColor:'black',
        height:height*0.05,
        borderWidth:0.5,
        width:width*0.5,
        borderRadius:5,
        marginBottom:height*0.01,
    },
    pwForget:{
        display:'flex',
        alignSelf:'flex-end',
        color:'#929EB2'
    },
    return:{
        width:width*0.08,
        height:height*0.04,
        position:'absolute',
        left:width*0.02,
        top:-height*0.04
    }
})
export default function ChangePassword(){
    const navigation=useNavigation()
    const [confirm,setConfirm]=useState('')
    const [password,setPassword]=useState('')
    async function handleSubmit(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token')
        if(password===confirm){
            axios.post(`http://8.152.214.138:8080/api/${userId}/userpage/alterpassword`,{
                password:password,
            },{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                navigation.navigate('EditInformation')
            })
            .catch((error)=>{
                console.log(password)
                console.log(error)
            })
        }
        else{
            console.log('密码不同，请重试')
        }
    }
    return(
        <View style={styles.container}>
            <Pressable style={styles.return} onPress={()=>{navigation.goBack()}}>
                <Image  style={styles.return}source={require('../picture/return.png')}></Image>
            </Pressable>
            <Image source={require('../picture/logo1.jpg')}
                style={{width:width*0.2,height:height*0.1,marginBottom:height*0.03}}
            ></Image>
            <Text
                style={{fontSize:width*0.08}}
            >请设置您的新密码</Text>
            <View>
                <View style={{marginTop:height*0.04}}>
                    <TextInput
                        style={styles.input}
                        placeholder='输入密码'
                        value={password}
                        onChange={e=>setPassword(e.nativeEvent.text)}
                    ></TextInput>
                    <View style={{width:width*0.5}}>
                        <TextInput
                            style={styles.input}
                            placeholder='确认密码'
                            value={confirm}
                            onChange={e=>setConfirm(e.nativeEvent.text)}
                        >
                        </TextInput>
                    </View>
                </View>
            </View>
            <Pressable
                style={{backgroundColor:'#61B15A',width:width*0.7,height:height*0.06,borderRadius:10,marginBottom:height*0.01,marginTop:height*0.04}}
                onPress={handleSubmit}
            >
                <Text
                    style={{lineHeight:height*0.06,textAlign:'center',color:'white',fontSize:20}}
                >确认修改</Text>
            </Pressable>
            <Image
                source={require('../picture/leafbg.png')}
                style={{width:width,height:height*0.3}}
            ></Image>
        </View>
    )
}
