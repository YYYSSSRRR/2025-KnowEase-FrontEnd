import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionComment from './QuestionComment';
import * as ImagePicker from 'expo-image-picker';
import Reply from './Reply';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    returnImage:{
        marginTop:height*0.07,
        marginLeft:width*0.03,
        height:height*0.02,
        width:width*0.06
    },
    profileImage:{
        height:height*0.04,
        width:width*0.09,
        borderRadius:width*0.04,
    },
    contentBody:{
        display:'flex',
        flexDirection:'row',
        marginTop:height*0.1,
        marginLeft:width*0.06
    },
    like:{
        height:height*0.03,
        width:width*0.06,
        
    },
    tag:{
        width:width*0.15,
        height:height*0.03,
        backgroundColor:'#D6EBD5',
        marginLeft:width*0.07,
        borderRadius:width*0.02,
        borderWidth:1,
        borderColor:'#61B15A',
        display:'flex',
        flexDirection:'row',marginTop:height*0.01
    },
    tagIcon:{
        width:width*0.043,
        height:height*0.02,
        marginTop:height*0.005,
        marginLeft:width*0.005
    },
    division:{
        height:height*0.002,
        margin:'auto',
        marginTop:height*0.02,
        width:width*0.95
    },
    question:{
        height:height*0.03,
        width:width*0.067,
        marginLeft:width*0.04,
        marginRight:width*0.02
    },
    look:{
        height:height*0.03,
        width:width*0.053,
        marginRight:width*0.001
    }
})

export default function QuestionDetail({route}){
    const navigation=useNavigation();
    const [commentCount,setCommentCount]=useState(0);
    const [authorUrl,setAuthorUrl]=useState('');
    const [LikeCount,setLikeCount]=useState(0);
    const [SaveCount,setSaveCount]=useState(0);
    const [AuthorName,setAuthorName]=useState('');
    const [tag,setTag]=useState('');
    const [content,setContent]=useState('');
    const {PostID}=route.params;
    const [LikeStatus,setLikeStatus]=useState(false);
    const [SaveStatus,setSaveStatus]=useState(false);
    const [addComment,setAddComment]=useState('');
    const [comment,setComment]=useState([]);
    const [posterid,setPosterid]=useState('');
    const update=async ()=>{
        const token=await AsyncStorage.getItem('token');
        const userId=await AsyncStorage.getItem('userId');
        axios.get(`https://mini.knowease2025.com/api/QA/${userId}/${PostID}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            setAuthorName(response.data.QAMessage.AuthorName);
            setAuthorUrl(response.data.QAMessage.AuthorURL);
            setContent(response.data.QAMessage.question);
            setTag(response.data.QAMessage.Tag);
            setPosterid(response.data.QAMessage.AuthorID)
        })
    }
    async function updateComment() {
        try{
            const userId=await AsyncStorage.getItem('userId');
            const token=await AsyncStorage.getItem('token');
            const data=await axios.get(`https://mini.knowease2025.com/api/QA/${PostID}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setComment(data.data.QAMessage.Comment);
            
        }
        catch{err=>{console.log(err)}}
    }
    const updateStatus=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.get(`https://mini.knowease2025.com/api/${userId}/post/${PostID}/getstatus`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            setLikeStatus(response.data.LikeStatus)
            setSaveStatus(response.data.SaveStatus)
            console.log('更新状态成功')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const updateCount=async ()=>{
        try{
            const userId=await AsyncStorage.getItem('userId');
            const token=await AsyncStorage.getItem('token');
            const response=await axios.get(`https://mini.knowease2025.com/api/${userId}/QA/${PostID}/getcounts`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setLikeCount(response.data.likecount)
            setSaveCount(response.data.savecount)
            setCommentCount(response.data.CommentCount)
        }
        catch(err){
            console.log(err)
        }
        
    }
    const handleLikeQA=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(!LikeStatus)
        {axios.post(`https://mini.knowease2025.com/api/${userId}/qa/${PostID}/like`,{},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(
            ()=>{
                updateCount();
                updateStatus();
                console.log('点赞更新成功')
            }
        )
        .catch(err=>{console.log(err.response.data)})}
        else{
            axios.post(`https://mini.knowease2025.com/api/${userId}/qa/${PostID}/cancellike`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                updateCount();
                updateStatus();
                console.log('点赞更新成功')
            })
            .catch(err=>{console.log(err.response.data)})
        }
    }
    const handleSaveQA=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(SaveStatus){
            axios.post(`https://mini.knowease2025.com/api/${userId}/qa/${PostID}/cancelsave`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                updateCount();
                updateStatus();
                console.log('收藏成功')
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            axios.post(`https://mini.knowease2025.com/api/${userId}/qa/${PostID}/save`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                updateCount();
                updateStatus();
                console.log('收藏成功')
            })
            .catch(err=>{
                console.log(err.response.data)
            })
        }
    }
    const handleSubmitComment=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`https://mini.knowease2025.com/api/${userId}/qa/${PostID}/publishcomment`,{

            body:addComment
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            console.log('发布comment成功');
            setAddComment('');
            updateCount();
            updateComment();
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        update();
        updateCount();
        updateStatus();
        updateComment();
    },[])
    return(
        <View>
            <Pressable onPress={()=>navigation.goBack()}
                style={{height:height*0.03,width:width*0.1}}
                >
                <Image source={require('../picture/returnbutton.png')} style={styles.returnImage}></Image>
            </Pressable>
            <View style={styles.contentBody}>
                <Pressable  onPress={()=>{
                    navigation.navigate('OtherPeople',{
                        posterid:posterid
                    })
                }}>
                    {/* <Image source={{uri:profileUrl}} style={styles.profileImage}></Image> */}
                    <Image source={{uri:authorUrl}} style={styles.profileImage}></Image>
                </Pressable>
                <View style={{marginLeft:width*0.04}}>
                    <Text style={{fontSize:width*0.04,marginBottom:height*0.01,marginTop:height*0.01}}>{AuthorName}</Text>
                    <Text style={{fontSize:width*0.04,marginTop:height*0.02}}>{content}</Text>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row',gap:width*0.05,justifyContent:'flex-end',marginRight:width*0.03,marginTop:height*0.04}}>
                <View style={{display:'flex',flexDirection:'row'}}>
                    <Image source={require('../picture/comment.png')} style={styles.look}></Image>
                    <Text style={{lineHeight:height*0.03,fontSize:width*0.035,marginLeft:width*0.01}}>{commentCount}</Text>
                </View>
                <Pressable  style={{display:'flex',flexDirection:'row'}} onPress={handleSaveQA}>
                    <Image source={SaveStatus?require('../picture/alreadysave.png'):require('../picture/notsave.png')} style={styles.like}></Image>
                    <Text style={{lineHeight:height*0.03,fontSize:width*0.035,marginLeft:width*0.01}}>{SaveCount}</Text>
                </Pressable>
                <Pressable  style={{display:'flex',flexDirection:'row'}} onPress={handleLikeQA}>
                    <Image source={LikeStatus?require('../picture/alreadylike.png'):require('../picture/notlike.png')} style={styles.like}></Image>
                    <Text style={{lineHeight:height*0.03,fontSize:width*0.035,marginLeft:width*0.01}}>{LikeCount}</Text>
                </Pressable>
            </View>
            <View style={styles.tag}>
                <Image source={require('../picture/tag标签(1).png')} style={styles.tagIcon}></Image>
                <Text style={{lineHeight:height*0.028,marginLeft:width*0.01,fontSize:width*0.03,color:'#61B15A'}}>{tag}</Text>
            </View>
            {/* <Image source={require('../picture/分割线 (1)(1).png')} style={styles.division}></Image> */}
            <View style={{display:'flex',flexDirection:'row',marginTop:height*0.01}}>
                <Image source={require('../picture/questionone.png')} style={styles.question}></Image>
                <Text style={{lineHeight:height*0.03,fontSize:width*0.04,color:'#61B15A'}}>最热comment</Text>
            </View>
            <ScrollView style={{marginLeft:width*0.03,height:height*0.55}}>
                {/* <PostComment PostID={PostID}></PostComment> */}
                <QuestionComment PostID={PostID} comment={comment} setComment={setComment} updateComment={updateComment}></QuestionComment>
            </ScrollView>
            <View style={{display:'flex',flexDirection:'row',height:height*0.04,borderWidth:1,width:width*0.8,margin:'auto',borderRadius:width*0.01,backgroundColor:'#D6EBD5',borderColor:'#61B15A',alignItems:'center'}}>
                <TextInput 
                    placeholder='comment一下吧' 
                    style={{height:height*0.03,width:width*0.6,margin:'auto',borderRadius:width*0.01,backgroundColor:'#D6EBD5',borderColor:'#61B15A'}}
                    value={addComment}
                    onChangeText={(text)=>{
                        setAddComment(text);
                    }}
                >
                </TextInput>
                <Pressable style={{marginRight:width*0.02,lineHeight:height*0.04,marginLeft:width*0.02}} onPress={handleSubmitComment}>
                    <Text>发布</Text>
                </Pressable>
            </View>
        </View>
    )
}