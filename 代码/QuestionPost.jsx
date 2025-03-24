import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    post:{
        height:height*0.22,
        width:width*0.8,
        backgroundColor:'#F4F8EC',
        borderRadius:width*0.08,
        marginTop:height*0.02,
        paddingTop:height*0.01
    },
    postbody:{
        display:'flex',
        flexDirection:'row',
        gap:width*0.05,
        marginTop:height*0.01,
        marginLeft:width*0.03,
        alignItems:'center'
    },
    profile:{
        height:height*0.06,
        width:width*0.13,
        borderRadius:width*0.06,
    },
    postername:{
        fontSize:width*0.05,
        marginBottom:height*0.01
    },
    profile2:{
        marginTop:height*0.03
    },
    tagIcon:{
        height:height*0.02,
        width:width*0.045
    },
    tag:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#EDF4E7',
        width:width*0.17,
        justifyContent:'center',
        height:height*0.03,
        alignItems:'center',
        marginRight:'auto',
        borderRadius:width*0.01,
        borderWidth:width*0.001,
        borderColor:'#5EC455',
        marginLeft:width*0.02
    },
    postbottom:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginTop:height*0.01,
    },
    commenticon:{
        display:'flex',
        flexDirection:'row',
        marginRight:width*0.03
    },
    iconImage:{
        height:height*0.021,
        width:width*0.048,
        marginRight:width*0.01
    },
    postbutton:{
        height:height*0.04,
        width:width*0.2,
        backgroundColor:'#61B15A',
        borderRadius:width*0.02
    }
})
export default function QuestionPost(props){
    const navigation=useNavigation();
    const {posts}=props;
    return(
        posts.map((a,index)=>{
        return(
            <View style={styles.post} key={index}>
                <Pressable onPress={()=>navigation.navigate('QuestionDetail',{
                    PostID:a.PostID
                })}>
                    <View style={styles.postbody}>
                        <Image source={{uri:a.AuthorURL}} style={styles.profile}></Image>
                        <Text style={styles.postername}>{a.AuthorName}</Text> 
                    </View>
                    <View style={{height:height*0.08}}>
                        <Text style={{fontSize:width*0.05,textAlign:'center',marginTop:height*0.02}}>{a.question}</Text>
                    </View>
                    
                    <View style={styles.postbottom}>
                        <View style={styles.tag}>
                            <Image source={require('../图片/tag标签(1).png')} style={styles.tagIcon}></Image>
                            <Text>{a.Tag}</Text>
                        </View>
                        <View style={styles.commenticon}>
                            <Image source={require('../图片/收藏数量.png')} style={styles.iconImage}></Image>
                            <Text>{a.SaveCount}</Text>
                        </View>
                        <View style={styles.commenticon}>
                            <Image source={require('../图片/点赞数量.png')} style={styles.iconImage}></Image>
                            <Text>{a.LikeCount}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }))
}