import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    head:{
        display:'flex',
        flexDirection:'row',
        marginTop:height*0.07,
        height:height*0.06,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        alignContent:'center',
        justifyContent:'space-between'
    },
    profilePhoto:{
        marginLeft:width*0.03,
        height:height*0.03,
        width:height*0.03,
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
        height:height*0.05,
        width:width*0.1,
        position:'relative',
        bottom:height*0.01,
        borderRadius:width*0.1,
        marginRight:width*0.03
    },
    textInputContent:{
        width:width*0.8,
        height:height*0.05,
        backgroundColor:'white',
        borderRadius:width*0.02,
        marginBottom:height*0.01,
        marginLeft:width*0.05,
        paddingLeft:width*0.02,
        fontSize:width*0.04
    },
    sendIcon:{
        height:height*0.05,
        width:width*0.1,
        marginLeft:width*0.016,
        borderRadius:width*0.07
    },
    content:{
        height:height*0.78,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        paddingTop:height*0.02
    },
    chatProfile:{
        height:height*0.05,
        width:width*0.1,
        borderRadius:width*0.1,
        marginRight:width*0.02
    },
    mychatmessage:{
        marginLeft:'auto',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:height*0.01
    },
    mymessage:{
        backgroundColor:'#74AF64',
        height:height*0.045,
        marginRight:width*0.02,
        borderRadius:width*0.02,
        padding:height*0.001
    },
    userchatmessage:{
        marginRight:'auto',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:height*0.01,
        marginLeft:width*0.02
    },
    usermessage:{
        backgroundColor:'grey',
        height:height*0.045,
        marginRight:width*0.02,
        borderRadius:width*0.02,
        padding:height*0.001
    }
})
export default function UserChat({route}){
    const navigation=useNavigation();
    const {userName,userId,userProfile}=route.params;
    const [inputText,setInputText]=useState('');
    const [message,setMessage]=useState([]);
    const [myId,setMyId]=useState('');
    const [chatid,setChatid]=useState('');
    const [profile,setProfile]=useState('');    
    const ws=useRef(null);
    const getMessage=async()=>{
        const myId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        
        axios.get(`https://mini.knowease2025.com/api/userpage/${myId}/chat/${userId}/initchat`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((data)=>{
            setChatid(data.data.chatmessage.chatid);
            axios.get(`https://mini.knowease2025.com/api/chat/${myId}/view/${data.data.chatmessage.chatid}/gethistory`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                setMessage(response.data.chathiastory);
            })
            .catch((err)=>{
                console.log(err.response.data,'获取信息错误');
            })
        })
        .catch((err)=>{console.log(err.response.data,'获取聊天id错误')})
    }
    async function sendMessage(){
        const token=await AsyncStorage.getItem('token');
        axios.post(`https://mini.knowease2025.com/api/chat/postmessage`,{
            chatid:chatid,
            content:inputText,
            reciverid:userId,
            senderid:myId
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            getMessage();
            setInputText('');
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                await getMessage();
                const storedMyId = await AsyncStorage.getItem('userId');
                setMyId(storedMyId);
                const storedProfile = await AsyncStorage.getItem('profile');
                setProfile(storedProfile);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
        const connectws=async()=>{
            const token=await AsyncStorage.getItem('token');
            const myId=await AsyncStorage.getItem('userId');
            const result=await axios.get(`https://mini.knowease2025.com/api/userpage/${myId}/chat/${userId}/initchat`)
            const chatid=result.data.chatmessage.chatid;
            console.log(chatid)
            console.log(myId)
            const websocket = new WebSocket(`wss://mini.knowease2025.com:8080/api/chat/${myId}/${chatid}/get`);
            
            websocket.onopen=()=>{
                console.log('websocket opened');
            };
            websocket.onmessage=(event)=>{
                try{
                    if(typeof event.data==='string'){
                        const newMessage=JSON.parse(event.data);
                        setMessage((prevMessages)=>[...prevMessages,newMessage]);
                    }
                    console.log(event);
                }
                catch(err){
                    console.log(err);
                }
            }
            websocket.onclose=()=>{
                console.log('websocket closed');
            }
            websocket.onerror=()=>{
                console.log('websocket error');
            }
            ws.current = websocket
        }
        connectws();
        return()=>{
            if(ws.current){
                ws.current.close();
            }
        }
    },[])
    return(
        <View>
            <View style={styles.head}>
                <Pressable onPress={()=>{navigation.navigate('MyMessage')}}>
                    <Image source={require('../picture/return.png')} style={styles.profilePhoto} ></Image>
                </Pressable>
                
                <Text style={{fontSize:width*0.05}}>{userName}</Text>
                
                <Image source={{uri:userProfile}} style={styles.searchPhoto}></Image>
                
            </View>
            <View style={styles.content}>
                <ScrollView>
                    {message&&message.map((a,index)=>{
                        return(a.senderid==myId?
                            <View style={styles.mychatmessage} key={index}>
                                <View style={styles.mymessage}>
                                    <Text style={{lineHeight:height*0.045,color:'white'}}>{a.content}</Text>
                                </View>
                                <Image source={{uri:profile}} style={styles.chatProfile}></Image>
                            </View>:
                            <View style={styles.userchatmessage} key={index}>
                                <Image source={{uri:userProfile}} style={styles.chatProfile}></Image>
                                <View style={styles.usermessage}>
                                    <Text style={{lineHeight:height*0.045,color:'white'}}>{a.content}</Text>
                                </View>
                            </View>
                        )
                        
                        
                    })}
                </ScrollView>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <TextInput style={styles.textInputContent}
                    placeholder='发消息...'
                    value={inputText}
                    onChange={(e)=>{setInputText(e.nativeEvent.text)}}
                >
                </TextInput>
                <Pressable  style={styles.sendIcon} onPress={sendMessage}>
                    <Image source={require('../picture/aisend.png')} style={styles.sendIcon}></Image>
                </Pressable>
            </View>
        </View>
    )
}