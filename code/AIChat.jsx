import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventSource } from 'event-source-polyfill';
import { convertStringArrayToDate } from '@ant-design/react-native/lib/date-picker/date-picker-date-utils';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
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
        height:height*0.03,
        width:width*0.065
    },
    content:{
        height:height*0.75,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        paddingTop:height*0.02
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
    },
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
        width:width*0.13
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
    title:{
        lineHeight:height*0.04,
        fontSize:width*0.06
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
    rolemessage:{
        height:height*0.05,
        paddingRight:width*0.02,
        backgroundColor:'#74AF64',
        marginLeft:'auto',
        marginBottom:height*0.02,
        marginRight:width*0.04,
        borderRadius:width*0.02,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:width*0.02,
    },
    aimessage:{
        paddingRight:width*0.02,
        backgroundColor:'#BDC0C1',
        marginLeft:width*0.04,
        marginBottom:height*0.02,
        marginRight:'auto',
        borderRadius:width*0.02,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:width*0.02,
        
        fontSize:width*0.045,
        padding:width*0.02
    },
    aitext:{
        
        fontSize:width*0.045
    },
    usertext:{
        color:'white',
        fontSize:width*0.045
    }
})
export default function AIChat(){
    const [messages,setMessages]=useState([]);
    const [inputText,setInputText]=useState('');
    const [isTyping,setIsTyping]=useState(false);
    const [typingText,setTypingText]=useState('');
    const navigation=useNavigation();
    const sendMessage=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        const eventSource=new EventSource(`http://8.152.214.138:8080/api/aichat/${userId}/sseconnect`);
        eventSource.onopen=()=>{
            console.log('sse连接已连接');
        }
        if(inputText.trim()==='') return;
        const newMessages=[...messages,{text:inputText,isUser:true}];
        
        setMessages(newMessages);
        setInputText('');
        setIsTyping(true);
        axios.post(`http://8.152.214.138:8080/api/aichat/chat/${userId}/postchat`,{
            request:inputText
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(
            ()=>{
                console.log('成功发送请求')
            }
        )
        .catch(err=>{console.log(err)})
        eventSource.onerror=(error)=>{
            console.log('连接出错',error);
            setIsTyping(false);
            setTypingText('');
            eventSource.close();
        }
        eventSource.onmessage=(event)=>{
            const data=event.data;
            if(data==='D'){
                console.log(111)
                setIsTyping(false);
                setTypingText('');
                getMessage();
            }
            else{
                setTypingText((pre)=>pre+data);
            }
            
        }
    }
    const getMessage=async()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.get(`http://8.152.214.138:8080/api/aichat/${userId}/search/gethistory`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            const history=response.data.chathistory;
            const newMessage=history.flatMap((item)=>[
                {text:item.request,isUser:true},
                {text:item.response,isUser:false}
            ]);
            setMessages(newMessage)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getMessage();
    },[]);
    return(
        <View>
            <View style={styles.head}>
                <Image source={require('../picture/newchat.png')} style={styles.profilePhoto} ></Image>
                <Text style={styles.title}>AI小知</Text>
                <Pressable  style={styles.search} onPress={()=>{navigation.navigate('AIChatRecord')}}>
                    <Image source={require('../picture/airecord.png')} style={styles.searchPhoto}></Image>
                </Pressable>
            </View>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                >
                    <View>
                        {messages.map((item,index)=>{
                            return(
                                <View key={index} style={item.isUser?styles.rolemessage:styles.aimessage}>
                                    <Text style={item.isUser?styles.usertext:styles.aitext}>{item.text}</Text>
                                </View>
                            )
                        })}
                        {isTyping&&<Text style={styles.aimessage}>{typingText}</Text>}
                    </View>
                </ScrollView>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <TextInput style={styles.textInputContent}
                    placeholder='问我任何事...'
                    value={inputText}
                    onChange={(e)=>{setInputText(e.nativeEvent.text)}}
                >
                </TextInput>
                <Pressable  style={styles.sendIcon} onPress={sendMessage}>
                    <Image source={require('../picture/aisend.png')} style={styles.sendIcon}></Image>
                </Pressable>
            </View>
            <View style={styles.bottom}>
                <Pressable onPress={()=>{navigation.navigate('Question')}} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/question.jpg')} style={{height:height*0.033,width:height*0.03}}></Image>
                    <Text style={{color:'#A1A8AD'}}>问答</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('LifeZone')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/life.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>生活</Text>
                </Pressable>
                <Pressable  onPress={()=>{navigation.navigate('AddQuestion')}}>
                    <Image source={require('../picture/addposts.jpg')}></Image>
                </Pressable>
                <Pressable style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/chatroom.png')} style={{height:height*0.03,width:height*0.03}}></Image>
                    <Text style={{color:'#63AD64'}}>聊天</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('My')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/shape.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>我的</Text>
                </Pressable>
            </View>
        </View>
    )
}
    
    
    
    

// function ChatRoom({message}){
//     return(
//         <View >
//             <View >
//                 {message.map((item,index)=>{
//                     return(
//                         <View key={index} style={styles.rolemessage}>
//                             <Text style={{color:'white',fontSize:width*0.045}}>{item.content}</Text>
//                         </View>
//                     )
//                 })}
//             </View>
//         </View>
//     )
// }
// export default function AIChat(){
//     const [message,setMessage]=useState([]);
//     const [text, setText] = useState('');
//     const sendMessage = () => {
//             const newMessage = {
//                 role: 'user',
//                 content: text,
//             };
//             setMessage([...message, newMessage]);
//             setText('');
//     };
//     return(
//         <Framework sendMessage={sendMessage} text={text} setText={setText}>
//             <ChatRoom message={message}></ChatRoom>
//         </Framework>
//     )
// }