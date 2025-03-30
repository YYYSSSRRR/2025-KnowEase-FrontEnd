import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    deleteicon:{
        height:height*0.025,
        width:width*0.055
    },
    result:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        marginLeft:width*0.08,
        marginRight:width*0.08,
        borderColor:'grey',
        height:height*0.05
    },
    text:{
        fontSize:width*0.047
    }
})
export default function SearchResult({postMap,qaMap}){
    const navigation=useNavigation();
    return(
        <View>
            {postMap?postMap.map((a,index)=>{
                return(
                    <View style={styles.result} key={index}>
                        <Text style={styles.text}>{a.title}</Text>
                        <Pressable onPress={()=>{
                            navigation.navigate('PostDetail',{
                                PostID:a.PostID
                            })
                        }}>
                            <Image source={require('../picture/detail.png')} style={styles.deleteicon}></Image>
                        </Pressable>
                    </View>
                )
            }):null}
            {qaMap?qaMap.map((a,index)=>{
                return(
                    <View style={styles.result} key={index}>
                        <Text style={styles.text}>{a.question}</Text>
                        <Pressable onPress={()=>{
                            navigation.navigate('QuestionDetail',{
                                PostID:a.PostID
                            })
                        }}>
                            <Image source={require('../picture/detail.png')} style={styles.deleteicon}></Image>
                        </Pressable>
                    </View>
                )
            }):null}
        </View>
    )
}