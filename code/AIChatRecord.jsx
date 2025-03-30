import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventSource } from 'event-source-polyfill';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    head:{
        display:'flex',
        flexDirection:'row',
        marginTop:height*0.06,
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
    content:{
        height:height*0.8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        paddingTop:height*0.02
    },
    bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        height:height*0.07,
        borderTopWidth:1,
        borderColor:'grey',
        padding:height*0.01
    },
    title:{
        lineHeight:height*0.04,
        fontSize:width*0.06
    },
    record:{
        height:height*0.1,
        width:width*0.9,
        backgroundColor:'#FAFAFA',
        borderRadius:width*0.03,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:width*0.03,
        marginTop:height*0.01,
        marginBottom:height*0.01,
    },
    return:{
        height:height*0.03,
        width:width*0.06
    }
})
export default function AIChatRecord(){
    const navigation=useNavigation();
    const [inputText,setInputText]=useState('');
    const [record,setRecord]=useState([]);
    const getRecord=async()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.get(`http://8.152.214.138:8080/api/aichat/${userId}/search/gethistory`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            const history=response.data.chathistory;
            const newRecord=history.map((item)=>({
                request:item.request,
            }));
            setRecord(newRecord)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getRecord();
    },[])
    return(
        <View>
            <View style={styles.head}>
                <Pressable onPress={()=>navigation.navigate('AIChat')}>
                    <Image source={require('../picture/return.png')} style={styles.profilePhoto} ></Image>
                </Pressable>
                
                <Text style={styles.title}>历史</Text>
                <Pressable  style={styles.search} onPress={()=>{navigation.navigate('Search')}}>
                    <Image source={require('../picture/airecord.png')} style={styles.searchPhoto}></Image>
                </Pressable>
            </View>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                >
                    {record.map((a,index)=>{
                        return(
                            <View style={styles.record} key={index}>
                                <Text style={{fontSize:width*0.05}}>{a.request}</Text>
                                <Image source={require('../picture/detailone.png')} style={styles.return}></Image>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            
            <View style={styles.bottom}>
                <Pressable onPress={()=>{navigation.navigate('Question')}}>
                    <Image source={require('../picture/question.jpg')} style={{height:height*0.033,width:height*0.03}}></Image>
                    <Text style={{color:'#A1A8AD'}}>问答</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('LifeZone')}>
                    <Image source={require('../picture/life.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>life</Text>
                </Pressable>
                <Pressable  onPress={()=>{navigation.navigate('AddQuestion')}}>
                    <Image source={require('../picture/addposts.jpg')}></Image>
                </Pressable>
                <Pressable>
                    <Image source={require('../picture/chatroom.png')} style={{height:height*0.03,width:height*0.03}}></Image>
                    <Text style={{color:'#63AD64'}}>聊天</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('My')}>
                    <Image source={require('../picture/shape.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>我的</Text>
                </Pressable>
            </View>
        </View>
    )
}