import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    passage:{
        height:height*0.34,
        width:width*0.8,
        // borderRadius:width*0.02,
        elevation: 5,
        shadowColor:'green',
        marginTop:height*0.03
    },
    passageImage:{
        width:width*0.8,
        height:height*0.25,
        borderTopLeftRadius:width*0.08,
        borderTopRightRadius:width*0.08,
        // position:'relative',
        // top:height*0.03
    },
    passageTitle:{
        height:height*0.09,
        borderBottomRightRadius:width*0.06,
        borderBottomLeftRadius:width*0.06,
        // borderRadius:width*0.06,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'white',
    },
    passageTitleProfile:{
        marginLeft:width*0.01,
        width:width*0.08,
        height:width*0.08,
        borderRadius:width*0.04
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
    color:{
        color:'black'
    },
    like:{
        height:height*0.02,
        width:width*0.04
    },
    look:{
        height:height*0.02,
        width:width*0.04
    }
})
export default function LifePosts(props){
    const navigation=useNavigation();
    const {posts}=props;
    return(posts.map((a,index)=>{
            return(
                <Pressable onPress={()=>{
                        navigation.navigate('PostDetail',{
                            PostID:a.PostID,
                        });
                    }}  key={index}>
                    <View style={styles.passage}>
                        <Pressable>
                            <Image source={{uri:a.urls}} style={styles.passageImage}></Image>
                        </Pressable>
                        <View style={styles.passageTitle}>
                            <Image source={{uri:a.PosterURL}} style={styles.passageTitleProfile}></Image>
                            <View style={{marginLeft:width*0.03}}>
                                <Text style={{fontSize:width*0.04,marginBottom:height*0.01}}>{a.title}</Text>
                                <Text style={{fontSize:width*0.03}}>{a.PosterName}</Text>
                            </View>
                            
                            <View style={{display:'flex',flexDirection:'row',position:'absolute',right:width*0.04}}>
                                <Image source={require('../图片/已点赞(1).png')} style={styles.like}></Image>
                                <Text style={{marginLeft:width*0.02}}>{a.LikeCount}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            )
        }))
}