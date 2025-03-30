import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    navigator:{
        borderColor:'grey',
        borderBottomWidth:1,
        marginTop:height*0.04,
        height:height*0.07,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    navigatorText:{
        lineHeight:height*0.035,
        marginRight:width*0.03,
        marginLeft:width*0.03,
        fontSize:width*0.04,
        color:'white'
    },
    navigatorTitle:{
        fontSize:width*0.06,
        color:'#585858'
    },
    returnButton:{
        height:height*0.04,
        width:width*0.08
    },
    profile:{
        height:height*0.05,
        width:width*0.1,
        borderRadius:width*0.07,
        marginLeft:width*0.05,
        marginRight:width*0.03,
        
    },
    likeMessage:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:height*0.01
    },
    postButtons:{
        backgroundColor:'#61B15A',
        marginRight:width*0.01,
        width:width*0.18,
        height:height*0.035,
        borderRadius:width*0.03,
        
    },
    navigatorTexts:{
        lineHeight:height*0.035,
        marginRight:width*0.03,
        marginLeft:width*0.03,
        fontSize:width*0.04,
        color:'white',
        
    },
    postButton1:{
        backgroundColor:'#C6DEBD',
        marginRight:width*0.01,
        width:width*0.18,
        height:height*0.035,
        borderRadius:width*0.03,
    }
})

export default function FollowMessage(){
    const navigation=useNavigation();
    const [followList,setFollowList]=useState([]);
    useEffect(()=>{
        const fetchlist=async()=>{
            const userId=await AsyncStorage.getItem('userId');
            const token=await AsyncStorage.getItem('token');
            axios.get(`http://8.152.214.138:8080/api/message/${userId}/view/follow/gethistory`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                setFollowList(response.data.messagehistory);
            })
            .catch(err=>{console.log(err)})
        }
        fetchlist();
    },[])
    return(
        <View>
            <View style={styles.navigator}>
                <Pressable style={{marginLeft:width*0.01}} onPress={()=>{navigation.goBack()}}>
                    <Image source={require('../picture/return.png')} style={styles.returnButton}></Image>
                </Pressable>
                <Text style={styles.navigatorTitle}>关注</Text>
                <Pressable style={styles.postButton} >
                    <Text style={styles.navigatorText}>发布</Text>
                </Pressable>
            </View>
            <View>
                {followList.map((a,index)=>{
                    return(
                        <View style={styles.likeMessage} key={index}>
                            <Image source={{uri:a.posterurl}} style={styles.profile}></Image>
                            <View>
                                <Text style={{fontSize:width*0.04}}>{a.message}</Text>
                            </View>
                            <Pressable style={{marginLeft:'auto',marginRight:width*0.01}}>
                                {a.followstatus?
                                <View style={styles.postButton1}>
                                    <Text style={styles.navigatorTexts}>已互关</Text>
                                </View>:
                                <View style={styles.postButtons}>
                                    <Text style={styles.navigatorTexts}>回关</Text>
                                </View>}
                                
                            </Pressable>
                        </View>
                    )
                })}
                
            </View>
        </View>
    )
}