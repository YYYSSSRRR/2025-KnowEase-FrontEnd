import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState,useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    guesssearch:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:width*0.1,
        marginTop:height*0.02,
        width:width*0.8,
        
    },
    guesssearchcontent:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    guessrecord:{
        width:width*0.25,
        borderWidth:1,
        height:height*0.04,
        marginLeft:width*0.05,
        borderRadius:width*0.04,
        borderColor:'grey',
        marginTop:height*0.01
    },
    recordtext:{
        fontSize:width*0.04,
        textAlign:'center',
        lineHeight:height*0.04
    }
})
export default function GuessSearch({handleGuessSearch,guessSearch}){
    return(
        <View>
            <View style={styles.guesssearch}>
                <Text style={{fontSize:width*0.045,marginRight:'auto'}}>猜你想搜</Text>
                <Pressable onPress={()=>{handleGuessSearch()}}>
                    <Image source={require('../图片/刷新.png')} style={{height:height*0.025,width:width*0.05}}></Image>
                </Pressable>
            </View>
            <View style={styles.guesssearchcontent}>
                {guessSearch?guessSearch.map((a,index)=>{
                    return(
                        <View style={styles.guessrecord} key={index}>
                            <Text style={styles.recordtext}>{a} </Text>
                        </View>
                    )
                }):null}
            </View>
        </View>
    )
}