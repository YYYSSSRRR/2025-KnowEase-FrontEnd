import Framework from './Framework';
import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LifePosts from './LifePosts';
import QuestionPost from './QuestionPost';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
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
    passage:{
        height:height*0.34,
        width:width*0.8,
        borderRadius:width*0.08,
        elevation: 5,
        shadowColor:'green',
        marginTop:height*0.03
    },
    passageImage:{
        width:width*0.8,
        height:height*0.25
    },
    passageTitle:{
        height:height*0.09,
        borderRadius:width*0.08,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'white',
        
    },
    passageTitleProfile:{
        marginLeft:width*0.01,
        width:width*0.08,
        height:width*0.08
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

export default function PostRecord(){
    const navigation=useNavigation();
    const [status,setStatus]=useState('life');
    const [lifePost,setLifePost]=useState([]);
    const [questionPost,setQuestionPost]=useState([]);
    const LifePost=async(status)=>{
        try{
            const userId=await AsyncStorage.getItem('userId')
            const token=await AsyncStorage.getItem('token')
            if(status==='life')
            {const response=await axios.get(`https://mini.knowease2025.com/api/userpage/${userId}/getuserpost`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setLifePost(response.data.Posts);
            }
            else if(status==='问答'){
                const response=await axios.get(`https://mini.knowease2025.com/api/userpage/${userId}/getuserqa`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setQuestionPost(response.data.QAs);
            }
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        LifePost(status);
    },[])
    return(
        <Framework status={status} setStatus={setStatus}>
            {status==='life'?lifePost&&<LifePosts posts={lifePost}></LifePosts>:<QuestionPost posts={questionPost}></QuestionPost>}
        </Framework>
    )
}