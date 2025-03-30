import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Reply from './Reply';
const {width,height}=Dimensions.get('window');
export default PostComment=React.memo(({PostID,comment,updateComment})=>{
    
    const [replyMap,setReplyMap]=useState({});
    const [replyImageMap,setReplyImageMap]=useState({});
    const [commentImage,setCommentImage]=useState('');
    const [commentLikeMap,setCommentLikeMap]=useState({});
    const [commentLikeStatusMap,setCommentLikeStatusMap]=useState({});
    // async function updateComment() {
    //     try{
    //         const userId=await AsyncStorage.getItem('userId');
    //         const token=await AsyncStorage.getItem('token');
    //         const data=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/${PostID}`,{
    //             headers:{
    //                 'Authorization':`Bearer ${token}`
    //             }
    //         })
    //         setComment(data.data.postMessage.Comment);
            
    //     }
    //     catch{err=>{console.log(err)}}
    // }
    async function updateCommentLike(commentid){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        const response=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/${PostID}/${commentid}/getcounts`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        setCommentLikeMap((pre)=>({...pre,[commentid]:response.data.likecount}))
        const data=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/${PostID}/${commentid}/getstatus`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        setCommentLikeStatusMap((pre)=>({...pre,[commentid]:data.data.LikeStatus}))
    }
    async function handleCommentLike(commentid){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(!commentLikeStatusMap[commentid]){
            axios.post(`http://8.152.214.138:8080/api/${userId}/life/${PostID}/${commentid}/like`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                updateCommentLike(commentid)
            })
            .catch(err=>console.log(err))
        }
        else{
            axios.post(`http://8.152.214.138:8080/api/${userId}/life/${PostID}/${commentid}/cancellike`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                updateCommentLike(commentid)
            })
            .catch(err=>console.log(err))
        }
    }
    async function handleSubmitReply(commentid) {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/${userId}/post/${PostID}/${commentid}/publishreply`,{
            imageurl:replyImageMap[commentid]||'',
            body:replyMap[commentid]||''
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            console.log(response.data)
            console.log('发布回复成功');
            console.log(commentid)
            updateComment();
            setReplyMap((pre)=>({...pre,[commentid]:''}));
            setReplyImageMap((pre)=>({...pre,[commentid]:''}));
        })
        .catch(err=>console.log(err))
    }
    
    async function uploadQiniu(file,status,commentid){
        console.log('qiniu')
        const tokenData=await AsyncStorage.getItem('token');
        const uploadToken=await axios.get('http://8.152.214.138:8080/api/getToken',{
            headers:{
                'Authorization':`Bearer ${tokenData}`
            }
        })
        
        if(!uploadToken){
            console.log('获取token失败')
        }
        else{
            const formData=new FormData();
            formData.append('file',{
                uri: file.uri,
                type: file.type,
                name: file.name
            });
            formData.append('token',uploadToken.data.token);
            console.log('sending')
            axios.post('https://up-z2.qiniup.com',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then((response)=>{
                console.log('sending')
                const data=response.data;
                if(data.key){
                    if(status==='comment')
                    {setCommentImage('https://mini-project.muxixyz.com/'+data.key);
                    console.log('上传成功'+data.key);
                    console.log(commentImage)}
                    else if(status==='回复'){
                        setReplyImageMap((pre)=>({...pre,[commentid]:'https://mini-project.muxixyz.com/'+data.key}));
                        console.log('上传成功'+data.key);
                    }
                    
                }
                else{
                    console.log('上传失败')
                }

            })
            .catch(error=>{
                if (error.response) {
                    console.log('服务器响应数据:', error.response.data);
                    console.log('服务器响应状态码:', error.response.status);
                    console.log('服务器响应头:', error.response.headers);
                } else if (error.request) {
                    console.log('请求已发送，但未收到响应:', error.request);
                } else {
                    console.log('请求设置出错:', error.message);
                }
            })
        }
    }
    const requestPermission=async ()=>{
            const {status}=await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status!=='granted'){
                Alert.alert('Permission required', 'You need to grant access to the photo library')
                return false;
            }
            return true;
        }
    async function pickImage(status,commentid){
        const permissionGranted=await requestPermission();
        if(!permissionGranted) return;
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:'images',
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!result.canceled){
            const file={
                uri:result.assets[0].uri,
                type:result.assets[0].mimeType,
                name:result.assets[0].fileName
            }
            
            await uploadQiniu(file,status,commentid);
            
        }
    }
    useEffect(()=>{
        updateComment();
    },[])
    useEffect(() => {
        const updateCommentLikes = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('token');
                const requests = comment.map(async (a) => {
                    const response = await axios.get(`http://8.152.214.138:8080/api/${userId}/post/${PostID}/${a.commentid}/getcounts`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await axios.get(`http://8.152.214.138:8080/api/${userId}/post/${PostID}/${a.commentid}/getstatus`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    return {
                        commentid: a.commentid,
                        likecount: response.data.likecount,
                        LikeStatus: data.data.LikeStatus
                    };
                });
                const results = await Promise.all(requests);
                const newCommentLikeMap = {};
                const newCommentLikeStatusMap = {};
                results.forEach((result) => {
                    newCommentLikeMap[result.commentid] = result.likecount;
                    newCommentLikeStatusMap[result.commentid] = result.LikeStatus;
                });
                // console.log(newCommentLikeStatusMap,'hhh');
                setCommentLikeMap(newCommentLikeMap);
                setCommentLikeStatusMap(newCommentLikeStatusMap);
            } catch (err) {
                console.log('初始化comment点赞信息出错:', err);
            }
        };
        
        updateCommentLikes();

    },[comment]);

    return(
        comment.map((a)=>{
        return(
            <View key={a.commentid} style={{marginTop:height*0.03}}>
                <View style={{display:'flex',flexDirection:'row',marginTop:height*0.01,marginBottom:height*0.01}}>
                    <Image source={{uri:a.CommenterURL}}></Image>
                    <Text>{a.CommenterName}</Text>
                </View>
                <Text>{a.body}</Text>
                {a.imageurl&&<Image source={{uri:a.imageurl}} style={{height:height*0.1,width:width*0.4,marginTop:height*0.01}}></Image>}
                <View style={{display:'flex',flexDirection:'row',marginTop:height*0.01,alignItems:'center'}}>
                    <TextInput
                        placeholder={`回复${a.CommenterName}`}
                        value={replyMap[a.commentid]||''}
                        onChangeText={text=>{
                            setReplyMap((pre)=>({...pre,[a.commentid]:text}))
                        }}
                        style={{width:width*0.4}}
                    ></TextInput>
                    <Pressable onPress={()=>pickImage('回复',a.commentid)}>
                        <Image source={require('../picture/addcommentpicture.png')} style={{height:height*0.02,width:width*0.04,marginLeft:width*0.03}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>handleSubmitReply(a.commentid)}>
                        <Image source={require('../picture/submitsucces.png')} style={{height:height*0.02,width:width*0.04,marginLeft:width*0.03}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>handleCommentLike(a.commentid)}>
                        <Image source={commentLikeStatusMap[a.commentid]?require('../picture/alreadylike.png'):require('../picture/notlike.png')} style={{height:height*0.02,width:width*0.04,marginLeft:width*0.25,marginRight:width*0.01}}></Image>
                    </Pressable>
                    <Text>{commentLikeMap[a.commentid]}</Text>
                    <Pressable>
                        <Image source={require('../picture/delete.png')} style={{height:height*0.02,width:width*0.04,marginLeft:width*0.02}}></Image>
                    </Pressable>
                </View>
                {a.Reply&& <Reply a={a} name={a.CommenterName} update={updateComment} pickImage={pickImage} uploadQiniu={uploadQiniu} handleSubmitReply={handleSubmitReply} replyMap={replyMap} setReplyMap={setReplyMap} replyImageMap={replyImageMap} setReplyImageMap={setReplyImageMap} PostID={PostID} />}
            </View>
            )
        })
    )
})