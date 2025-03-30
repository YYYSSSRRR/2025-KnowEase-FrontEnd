import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LifePosts from './LifePosts';
import QuestionPost from './QuestionPost';
import Search from './Search';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    returnImage:{
        marginTop:height*0.05,
        marginLeft:width*0.03,
        height:height*0.02,
        width:width*0.06
    },
    content:{
        height:height*0.75,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
    }
})
export default function SearchPostResult({route}){
    const {lifepost,qapost}=route.params;
    const navigation=useNavigation();
    return(
        <View>
            <Pressable onPress={()=>{navigation.navigate('Search')}}>
                <Image source={require('../picture/return.png')} style={styles.returnImage}></Image>
            </Pressable>
            <View style={styles.content}>
                <ScrollView>
                    {lifepost?<LifePosts posts={lifepost}></LifePosts>:null}
                    {qapost?<QuestionPost posts={qapost}></QuestionPost>:null}
                </ScrollView>
            </View>
            
        </View>
    )
}