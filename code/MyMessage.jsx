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
        gap:width*0.04
    },
    top:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        height:height*0.12,
        justifyContent:'space-between',
        marginBottom:height*0.03
    },
    textfocused:{
        lineHeight:height*0.04,
        fontSize:width*0.05
    },
    messageImage:{
        marginRight:width*0.03
    },
    message:{
        height:height*0.1,
        width:width*0.9,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:width*0.002,
        borderColor:'grey',
        justifyContent:'space-between'
    },
    detail:{
        marginLeft:'auto',
        marginRight:width*0.05,
        height:height*0.03,
        width:height*0.03
    },
    profile:{
        height:height*0.06,
        width:width*0.12,
        borderRadius:width*0.07,
        marginLeft:width*0.05,
        marginRight:width*0.03,
        
    },
    unread:{
        height:height*0.03,
        width:height*0.03,
        backgroundColor:'#EA415F',
        borderRadius:height*0.05,
        marginLeft:'auto',
        marginRight:width*0.05,
    },
    
})
export default function MyMessage(){
    const navigation=useNavigation();
    const [chatlist,setChatlist]=useState([]);
    
    const [likeCount,setLikeCount]=useState(0);
    const [commentCount,setCommentCount]=useState(0);
    const [followCount,setFollowCount]=useState(0);
    async function getChatroom(){
        const token=await AsyncStorage.getItem('token');
        const userId=await AsyncStorage.getItem('userId');
        axios.get(`http://8.152.214.138:8080/api/message/${userId}/getchatrooms`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            setChatlist(response.data.chatroomes);
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    async function getUnread(){
        const token=await AsyncStorage.getItem('token');
        const userId=await AsyncStorage.getItem('userId');
        axios.get(`http://8.152.214.138:8080/api/message/${userId}/getunread`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            setLikeCount(response.data.unreadmessage.likecount);
            setCommentCount(response.data.unreadmessage.commentcount);
            setFollowCount(response.data.unreadmessage.followcount);
            console.log(response.data.unreadmessage)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getChatroom();
        getUnread();
    },[])
    return (
        <View>
            <View style={styles.top}>
                <Pressable
                    onPress={()=>{
                        navigation.navigate('My');
                        }}
                        style={{
                            height:height*0.04,
                            width:height*0.04,
                            marginLeft:width*0.02
                        }}
                >
                    <Image source={require('../picture/return.png')} style={{height:height*0.025,width:height*0.04,marginTop:height*0.01,}}></Image>
                </Pressable>
                <View style={styles.navigation}>
                    <Text style={styles.textfocused}>消息</Text>
                </View>
                <Image source={require('../picture/more.png')} style={{height:height*0.04,width:height*0.04,marginRight:width*0.02,}}></Image>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../picture/likemessage.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04,width:width*0.5}}>点赞</Text>
                    {likeCount&&<View style={styles.unread}>
                        <Text style={{margin:'auto',color:'white'}}>{likeCount}</Text>
                    </View>}
                    <Pressable onPress={()=>{navigation.navigate('LikeMessage')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../picture/commentmessage.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04,width:width*0.5}}>comment</Text>
                    {commentCount&&<View style={styles.unread}>
                        <Text style={{margin:'auto',color:'white'}}>{commentCount}</Text>
                    </View>}
                    <Pressable onPress={()=>{navigation.navigate('CommentMessage')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../picture/followmessage.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04,width:width*0.5}}>关注</Text>
                    <View>
                        
                    </View>
                    {followCount&&<View style={styles.unread}>
                        <Text style={{margin:'auto',color:'white'}}>{followCount}</Text>
                    </View>}
                    <Pressable onPress={()=>{navigation.navigate('FollowMessage')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
            <ScrollView style={{height:height*0.55}}>
            
                {chatlist.map((a,index)=>{
                    return(
                        <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:height*0.01,height:height*0.1}}>
                            <Pressable onPress={()=>{navigation.navigate('UserChat',{
                                userName:a.userlist[1].username,
                                userId:a.userlist[1].userid,
                                userProfile:a.userlist[1].userurl
                            })}}>
                                <Image source={{uri:a.userlist[1].userurl}} style={styles.profile}></Image>
                            </Pressable>
                            
                            <View>
                                <Text style={{fontSize:width*0.045,marginBottom:height*0.01}}>{a.userlist[1].username}</Text>
                                <Text style={{fontSize:width*0.045,color:'grey'}}>{a.latestmessage&&a.latestmessage.content?a.latestmessage.content:'暂无消息'}</Text>
                            </View>
                            {a.unreadcount&&
                            <View style={styles.unread}>
                                <Text style={{margin:'auto',color:'white'}}>{a.unreadcount}</Text>
                            </View>}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}