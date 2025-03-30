import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    topBackground:{
        height:height*0.25,
        width:width,
        opacity:0.9,
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
        fontSize:width*0.035,
    },
    editeButton:{
        borderWidth:1.5,
        height:height*0.04,
        width:width*0.2,
        borderRadius:width*0.04,
        borderColor:'#96C583',
        backgroundColor:'#F4F8EC'
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
        borderTopWidth:1,
        borderColor:'grey',
        padding:height*0.01,
        marginTop:height*0.02,
        alignItems:'center'
    },
    bottomImage:{
        height:height*0.03
    }
})
export default function My(){
    const [profile,setProfile]=useState('');
    const [backgroundImage,setBackgroundImage]=useState('');
    const [getLikeCount,setGetLikeCount]=useState(0);
    const [fansCount,setFansCount]=useState(0);
    const [followCount,setFollowCount]=useState(0);
    const [userName,setUserName]=useState('');
    const [userId,setUserId]=useState('')
    const navigation=useNavigation();
    AsyncStorage.getItem('profile')
    .then((url)=>{
        setProfile(url)
    })
    .catch(err=>console.log(err))
    // AsyncStorage.getItem('backgroundImage')
    // .then((url)=>{
    //     setBackgroundImage(url)
    // })
    .catch(err=>console.log(err))
    AsyncStorage.getItem('userName')
    .then((name)=>{
        setUserName(name)
    })
    .catch(err=>console.log(err))
    AsyncStorage.getItem('userId')
    .then((id)=>{
        setUserId(id)
    })
    .catch(err=>console.log(err))
    async function update() {
        try{
            const token=await AsyncStorage.getItem('token');
            const response=await axios.get(`https://mini.knowease2025.com/api/${userId}/userpage/likecount`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            setGetLikeCount(response.data.LikesCount);
            setFansCount(response.data.FollowerCount);
            setFollowCount(response.data.FolloweeCount);
        }
        catch{
            err=>console.log(err)
        }
        
    }
    async function handleLogOut(){
        const token=await AsyncStorage.getItem('token');
        axios.post('https://mini.knowease2025.com/api/logout',{},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            navigation.navigate('Start')
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{update()},[]);
    
    useEffect(()=>{
        const fetchBackgroundImage=async()=>{
            const url=await AsyncStorage.getItem('backgroundImage');
            setBackgroundImage(url);
        }
        fetchBackgroundImage();
    },[])
    
    return(
        <View style={{display:'flex'}}>
            <ImageBackground source={{uri:backgroundImage}} style={styles.topBackground}>
                <View style={styles.topProfileInformation}>
                    <Image source={{uri:profile}} style={styles.profileImage}></Image>
                    <View>
                        <Text style={{lineHeight:height*0.05,fontSize:width*0.04}}>{userName}</Text>
                        <Text>ID:{userId}</Text>
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
                    <View style={{marginRight:width*0.2}}>
                        <Text style={styles.topText}>{getLikeCount}</Text>
                        <Text style={styles.topText}>获赞</Text>
                    </View>
                    <Pressable 
                    style={styles.editeButton}
                    onPress={()=>{
                        navigation.navigate('EditInformation')
                    }}
                    >
                        <Text style={{fontSize:width*0.04,textAlign:'center',lineHeight:height*0.04}}>编辑资料</Text>
                        
                    </Pressable>
                </View>
            </ImageBackground>
            <View>
                <View style={styles.bodyNavigator}>
                    <Image source={require('../picture/post.png')} style={styles.icon}></Image>
                    <Text style={styles.text}>发布</Text>
                    <Pressable onPress={()=>{navigation.navigate('PostRecord')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image source={require('../picture/lookrecord.png')} style={styles.icon}></Image>
                    <Text style={styles.text}>浏览记录</Text>
                    
                    <Pressable onPress={()=>{navigation.navigate('ViewRecord')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image style={styles.icon} source={require('../picture/redlike.png')}></Image>
                    <Text style={styles.text}>点赞</Text>
                    <Pressable onPress={()=>{navigation.navigate('LikeRecord')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image style={styles.icon} source={require('../picture/savetwo.png')}></Image>
                    <Text style={styles.text} >收藏</Text>
                    <Pressable onPress={()=>{navigation.navigate('SaveRecord')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image style={styles.icon} source={require('../picture/message.png')}></Image>
                    <Text style={styles.text}>消息</Text>
                    <Pressable onPress={()=>{navigation.navigate('MyMessage')}} style={styles.detail}>
                        <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image style={styles.icon} source={require('../picture/privacy.png')}></Image>
                    <Text style={styles.text}>隐私政策</Text>
                    <Image source={require('../picture/detailone.png')} style={styles.detail}></Image>
                </View>
                <View  style={styles.bodyNavigator}>
                    <Image style={styles.icon} source={require('../picture/aboutus.png')}></Image>
                    <Text style={styles.text}>关于我们</Text>
                    <Image source={require('../picture/detailone.png')}style={styles.detail}></Image>
                </View>
                <Pressable onPress={handleLogOut}>
                    <View  style={styles.bodyNavigator}>
                        <Image style={styles.icon} source={require('../picture/exit.png')}></Image>
                        <Text style={styles.text}>退出账号</Text>
                    </View>
                </Pressable>
                
                <View style={styles.bottom}>
                    <Pressable onPress={()=>navigation.navigate('Question')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <Image source={require('../picture/question.jpg')}></Image>
                        <Text style={{color:'#A1A8AD'}}>问答</Text>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate('LifeZone')}} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <Image source={require('../picture/life.jpg')}></Image>
                        <Text style={{color:'#A1A8AD'}}>life</Text>
                    </Pressable>
                    <Pressable>
                        <Image source={require('../picture/addposts.jpg')}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{
                        navigation.navigate('AIChat')
                    }} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <Image source={require('../picture/chat.png')} ></Image>
                        <Text style={{color:'#A1A8AD'}}>聊天</Text>
                    </Pressable>
                    <Pressable style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <Image source={require('../picture/mygreen.png')} style={styles.bottomImage}></Image>
                        <Text style={{color:'#63AD64',textAlign:'center'}}>我的</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}