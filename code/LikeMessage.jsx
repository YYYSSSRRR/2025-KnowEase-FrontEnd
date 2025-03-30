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
        marginTop:height*0.01,
        
    }
})

export default function LikeMessage(){
    const navigation=useNavigation();
    const [likeList,setLikeList]=useState([]);
    
    useEffect(()=>{
        const fetchlist=async()=>{
            const userId=await AsyncStorage.getItem('userId');
            const token=await AsyncStorage.getItem('token');
            axios.get(`https://mini.knowease2025.com/api/message/${userId}/view/like/gethistory`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                setLikeList(response.data.messagehistory);
            })
            .catch(err=>console.log(err))
        }
        fetchlist();
    },[])
    return(
        <View>
            <View style={styles.navigator}>
                <Pressable style={{marginLeft:width*0.01}} onPress={()=>{navigation.navigate('MyMessage')}}>
                    <Image source={require('../picture/return.png')} style={styles.returnButton}></Image>
                </Pressable>
                <Text style={styles.navigatorTitle}>点赞</Text>
                <Pressable style={styles.postButton} >
                    <Text style={styles.navigatorText}>发布</Text>
                </Pressable>
            </View>
            <View>
                {likeList.map((a,index)=>{
                    return(
                        <View style={styles.likeMessage} key={index}>
                            <Image source={{uri:a.posterurl}} style={styles.profile}></Image>
                            <View>
                                <Text style={{fontSize:width*0.04}}>{a.message}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}