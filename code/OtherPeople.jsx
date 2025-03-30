import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext,ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Framework1 from './Framework(other)';
import QuestionPost from './QuestionPost';
import LifePosts from './LifePosts';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    topBackground:{
        height:height*0.25,
        width:width,
    },
    topProfileInformation:{
        marginTop:height*0.08,
        marginLeft:width*0.08,
        height:height*0.1,
        width:width*0.55,
        display:'flex',
        flexDirection:'row'
    },
    profileImage:{
        width:width*0.17,
        height:width*0.17,
        borderRadius:width*0.1,
        marginRight:width*0.08
    },
    passageInformation:{
        display:'flex',
        flexDirection:'row',
        gap:width*0.08,
        marginLeft:width*0.07,
        
    },
    topText:{
        fontSize:width*0.035
    },
    editeButton:{
        borderWidth:1.5,
        height:height*0.04,
        width:width*0.17,
        borderRadius:width*0.04,
        borderColor:'#96C583',
        backgroundColor:'#F4F8EC',
        marginRight:width*0.03
    },
    bodyNavigator:{
        marginTop:height*0.01,
        display:'flex',
        flexDirection:'row',
        height:height*0.07,
        alignItems:'center',
        width:width,
    },
    icon:{
        marginLeft:width*0.04,
        height:height*0.03,
        width:height*0.03,
        marginRight:width*0.04
    },
    text:{
        fontSize:width*0.04,
    },
    detail:{
        marginLeft:'auto',
        marginRight:width*0.05,
        height:height*0.03,
        width:height*0.03
    },
    bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        height:height*0.07,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'grey',
        padding:height*0.01,
        marginTop:height*0.02,
        alignItems:'center'
    },
    bottomImage:{
        height:height*0.03
    },
    returnButton:{
        height:height*0.025,
        width:height*0.04,
        marginTop:height*0.04,
        marginLeft:width*0.05,
        position:'absolute',
        
    },
    cancelButton:{
        height:height*0.04,
        width:width*0.17,
        borderRadius:width*0.04,
        backgroundColor:'grey'
    }
    
})
export default function OtherPeople({route}){
    const {posterid}=route.params;
    const [profile,setProfile]=useState('');
    const [backgroundImage,setBackgroundImage]=useState('');
    const [getLikeCount,setGetLikeCount]=useState(0);
    const [fansCount,setFansCount]=useState(0);
    const [followCount,setFollowCount]=useState(0);
    const [userName,setUserName]=useState('');
    const [followStatus,setFollowStatus]=useState(false);
    const [status,setStatus]=useState('life');
    const [questionPost,setQuestionPost]=useState([]);
    const [lifePost,setLifePost]=useState([]);
    const navigation=useNavigation();
    async function update() {
        try{
            const token=await AsyncStorage.getItem('token');
            const response=await axios.get(`https://mini.knowease2025.com/api/${posterid}/userpage/count`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setFollowCount(response.data.FolloweeCount);
            setFansCount(response.data.FollowerCount);
            setGetLikeCount(response.data.LikesCount);
            const result=await axios.get(`https://mini.knowease2025.com/api/userpage/${posterid}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setProfile(result.data.userUrl);
            setBackgroundImage(result.data.backgroundUrl);
            setUserName(result.data.username);
            const userId=await AsyncStorage.getItem('userId');
            const status=await axios.get(`https://mini.knowease2025.com/api/${userId}/userpage/${posterid}/getstatus`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setFollowStatus(status.data.FollowStatus);
        }
        catch{
            err=>console.log(err)
        }
    }
    async function handleFollow(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(!followStatus){
            axios.post(`https://mini.knowease2025.com/api/${userId}/userpage/${posterid}/follow`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                console.log('success')
                update();
            })
            .catch(err=>{
                console.log(err.response.data);
            })
        }
        else{
            axios.post(`https://mini.knowease2025.com/api/${userId}/userpage/${posterid}/cancelfollow`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(()=>{
                console.log('success')
                update();
            })
            .catch(err=>{
                console.log(err.response.data);
            })
        }
    }
    async function handleGetPosts() {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(status==='问答'){
            axios.get(`https://mini.knowease2025.com/api/userpage/${posterid}/getuserqa`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                setQuestionPost(response.data.QAs);
                console.log('success')
            })
            .catch(err=>{console.log(err)})
        }
        else{
            axios.get(`https://mini.knowease2025.com/api/userpage/${posterid}/getuserpost`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                setLifePost(response.data.Posts);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    useEffect(()=>{update(),handleGetPosts()},[]);
    return(
        <View style={{display:'flex'}}>            
            <ImageBackground source={{uri:backgroundImage}} style={styles.topBackground}>
                <Pressable 
                    onPress={()=>{
                    navigation.goBack();
                    console.log('success')
                    }}
                    style={{
                        height:height*0.06,
                        width:height*0.06,
                        marginTop:height*0.04,
                        marginLeft:width*0.05,
                        position:'absolute'
                    }}
                >
                    <Image source={require('../picture/return.png')} style={{height:height*0.025,width:height*0.04,marginTop:height*0.01}}></Image>
                </Pressable>
                <View style={styles.topProfileInformation}>
                    <Image source={{uri:profile}} style={styles.profileImage}></Image>
                    <View>
                        <Text style={{lineHeight:height*0.05,fontSize:width*0.04}}>{userName}</Text>
                        <Text>ID:{posterid}</Text>
                    </View>
                </View>
                <Pressable>
                    <Image source={require('../picture/editone.png')} style={{height:height*0.03,width:height*0.03,position:'absolute',top:-height*0.045,left:width*0.22}}></Image>
                </Pressable>
                <View style={styles.passageInformation}>
                    <View>
                        <Text style={styles.topText}>{followCount}</Text>
                        <Text style={styles.topText}>关注</Text>
                    </View>
                    <View>
                        <Text style={styles.topText}>{fansCount}</Text>
                        <Text style={styles.topText}>粉丝</Text>
                    </View>
                    <View style={{marginRight:width*0.08}}>
                        <Text style={styles.topText}>{getLikeCount}</Text>
                        <Text style={styles.topText}>获赞</Text>
                    </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Pressable style={styles.editeButton} onPress={()=>{navigation.navigate("UserChat",{
                            userName:userName,
                            userId:posterid,
                            userProfile:profile
                        })}}>
                            <Text style={{fontSize:width*0.04,textAlign:'center',lineHeight:height*0.04}}>私信</Text>
                        </Pressable>
                        {followStatus?
                        <Pressable style={styles.cancelButton}
                            onPress={handleFollow}
                        >
                            <Text style={{fontSize:width*0.04,textAlign:'center',lineHeight:height*0.04}}>取消关注</Text>
                        </Pressable>:
                        <Pressable style={styles.editeButton}
                            onPress={handleFollow}
                        >
                            <Text style={{fontSize:width*0.04,textAlign:'center',lineHeight:height*0.04}}>关注</Text>
                        </Pressable>}
                    </View>
                    
                </View>
            </ImageBackground>
            <View style={{height:height*0.66,alignItems:'center'}}>
                <Framework1 status={status} setStatus={setStatus}>
                    {/* <View style={{height:height*0.5}}> */}
                        <ScrollView showsVerticalScrollIndicator={false} style={{height:height*0.8}}>
                            {status==='问答'?<QuestionPost posts={questionPost}></QuestionPost>:<LifePosts posts={lifePost}></LifePosts>}
                        </ScrollView>
                    {/* </View> */}
                </Framework1>
            </View>
            <View>
                <View style={styles.bottom}>
                    <Pressable>
                        <Image source={require('../picture/question.jpg')}></Image>
                        <Text style={{color:'#A1A8AD'}}>问答</Text>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate('LifeZone')}}>
                        <Image source={require('../picture/life.jpg')}></Image>
                        <Text style={{color:'#A1A8AD'}}>life</Text>
                    </Pressable>
                    <Pressable>
                        <Image source={require('../picture/addposts.jpg')}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{
                        navigation.navigate('AIChat')
                    }}>
                        <Image source={require('../picture/chat.png')} ></Image>
                        <Text style={{color:'#A1A8AD'}}>聊天</Text>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate('My')}}>
                        <Image source={require('../picture/shape.jpg')} style={styles.bottomImage}></Image>
                        <Text style={{color:'#A1A8AD',textAlign:'center'}}>我的</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}