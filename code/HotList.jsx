import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    hoticon:{
        width:width*0.06,
        height:height*0.03
    },
    hotlist:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:height*0.02,
        gap:width*0.02,
        marginLeft:width*0.03
    },
    hotlisttext:{
        display:'flex',
        flexDirection:'row',
        gap:width*0.02,
        marginTop:height*0.02
    },
    hot:{
        marginLeft:width*0.02
    },
    text:{
        fontSize:width*0.04
    }
})
export default function HotList({hotList}){
    return(
        <View>
            <View style={styles.hotlist}>
                <Image source={require('../picture/hot.png')} style={styles.hoticon}></Image>
                <Text style={{fontSize:width*0.05}}>小知热搜榜</Text>
            </View>
            <View style={styles.hot}>
                {hotList.map((a,index)=>{
                    return(
                        <View style={styles.hotlisttext} key={index}>
                            <Text style={{fontSize:width*0.04,color:'#EC625F'}}>{a.rank+1}</Text>
                            <Text style={styles.text}>{a.note}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}