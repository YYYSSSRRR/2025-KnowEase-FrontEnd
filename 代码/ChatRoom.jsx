import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    head:{
        display:'flex',
        flexDirection:'row',
        marginTop:height*0.07,
        height:height*0.06,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        alignContent:'center',
        justifyContent:'space-between'
    },
    profilePhoto:{
        marginLeft:width*0.03,
        height:height*0.03,
        width:height*0.03,
    },
    search:{
        marginRight:width*0.03,
        height:height*0.04,
        width:height*0.04
    },
    logo:{
        marginRight:width*0.03,
        height:height*0.05,
        width:height*0.05
    },
    searchPhoto:{
        height:height*0.03,
        width:width*0.065
    },
    textInputContent:{
        width:width*0.8,
        height:height*0.05,
        backgroundColor:'white',
        borderRadius:width*0.02,
        marginBottom:height*0.01,
        marginLeft:width*0.05,
        paddingLeft:width*0.02,
        fontSize:width*0.04
    },
    sendIcon:{
        height:height*0.05,
        width:width*0.1,
        marginLeft:width*0.016,
        borderRadius:width*0.07
    },
    content:{
        height:height*0.78,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        paddingTop:height*0.02
    },
})
export default function ChatRoom(){
    const navigation=useNavigation();
    const [inputText,setInputText]=useState('');
    return(
        <View>
            <View style={styles.head}>
                <Image source={require('../图片/返回 (1)(1).png')} style={styles.profilePhoto} ></Image>
                <Text style={{fontSize:width*0.06}}>AI小知</Text>
                <Pressable  style={styles.search} onPress={()=>{navigation.navigate('Search')}}>
                    <Image source={require('../图片/ai记录.png')} style={styles.searchPhoto}></Image>
                </Pressable>
            </View>
            <View style={styles.content}>
                <ScrollView></ScrollView>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <TextInput style={styles.textInputContent}
                    placeholder='发消息...'
                    // value={inputText}
                    // onChange={(e)=>{setInputText(e.nativeEvent.text)}}
                >
                </TextInput>
                <Pressable  style={styles.sendIcon} >
                    <Image source={require('../图片/ai发送.png')} style={styles.sendIcon}></Image>
                </Pressable>
            </View>
        </View>
    )
}