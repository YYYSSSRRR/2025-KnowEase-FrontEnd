import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    navigation:{
        display:'flex',
        flexDirection:'row',
        height:height*0.04,
        gap:width*0.04,
        
    },
    top:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:height*0.2,
        justifyContent:'space-between'
    },
    textfocused:{
        lineHeight:height*0.04,
        fontSize:width*0.05
    },
    textunfocused:{
        lineHeight:height*0.04,
        fontSize:width*0.05,
        color:'grey'
    },
    returnImage:{
        marginTop:height*0.05,
        marginLeft:width*0.03,
        height:height*0.02,
        width:width*0.06
    },
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
        height:height*0.04,
        width:height*0.04,
        borderRadius:height*0.1
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
        width:width*0.07
    },
    navigationText:{
        lineHeight:height*0.04,
        fontSize:width*0.04,
        color:'#A1A8AD'
    },
    content:{
        height:height*0.75,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
    }})
export default function Framework({children,status,setStatus}){
    const navigation=useNavigation();
    return (
        <View>
            <View style={styles.top}>
                <Pressable
                    onPress={()=>{
                        navigation.goBack();
                        }}
                        style={{
                            height:height*0.04,
                            width:height*0.04,
                            marginLeft:width*0.02
                        }}
                >
                    <Image source={require('../picture/return.png')} style={{height:height*0.025,width:height*0.04,marginTop:height*0.01}}></Image>
                </Pressable>
                <View style={styles.navigation}>
                    <Pressable onPress={()=>{
                        setStatus('life')
                    }}
                    style={{height:height*0.04,
                        width:width*0.1
                    }}
                    >
                        <Text style={status==='life'?styles.textfocused:styles.textunfocused}>life</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        setStatus('问答')
                    }}>
                        <Text style={status==='问答'?styles.textfocused:styles.textunfocused}>问答</Text>
                    </Pressable>
                </View>
                <Image source={require('../picture/more.png')} style={{height:height*0.04,width:height*0.04,marginRight:width*0.02}}></Image>
            </View>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                >
                    {children}
                </ScrollView>
            </View>
        </View>
    )
}