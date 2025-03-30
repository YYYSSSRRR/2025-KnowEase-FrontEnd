import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LifePosts from './LifePosts';
const {width,height}=Dimensions.get('window')
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
        width:width*0.065,
    },
    navigation:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        height:height*0.04,
        backgroundColor:'#F4F8EC'
    },
    navigationText:{
        lineHeight:height*0.04,
        fontSize:width*0.04,
        color:'#A1A8AD'
    },
    content:{
        height:height*0.75,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
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

function Framework({children,tag,setTag}){
    const [profileUrl,setProfileUrl]=useState('')
    const navigation=useNavigation();
    AsyncStorage.getItem('profile')
    .then((url)=>{
        setProfileUrl(url);
        console.log(url)
    })
    .catch(err=>{console.log(err)});
    return(
        <View>
            <View style={styles.head}>
                <Image source={{uri:profileUrl}} style={styles.profilePhoto} ></Image>
                <Image source={require('../picture/logo1.jpg')} style={styles.logo}></Image>
                <Pressable  style={styles.search} onPress={()=>{
                    navigation.navigate('Search')
                }}>
                    <Image source={require('../picture/search.jpg')} style={styles.searchPhoto}></Image>
                </Pressable>
            </View>
            <View style={styles.navigation}>
                <Pressable onPress={()=>{
                    setTag('关注')
                }}>
                    <Text style={[styles.navigationText,tag==='关注'&&styles.color]}>关注</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setTag('推荐')
                }}>
                    <Text style={[styles.navigationText,tag==='推荐'&&styles.color]}>推荐</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setTag('美食')
                }}>
                    <Text style={[styles.navigationText,tag==='美食'&&styles.color]}>美食</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setTag('绘画')
                }}>
                    <Text style={[styles.navigationText,tag==='绘画'&&styles.color]}>绘画</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setTag('life')
                }}>
                    <Text style={[styles.navigationText,tag==='life'&&styles.color]}>life</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    setTag('校园')
                }}>
                    <Text style={[styles.navigationText,tag==='校园'&&styles.color]}>校园</Text>
                </Pressable>
            </View>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                >
                    {children}
                </ScrollView>
            </View>
            <View style={styles.bottom}>
                <Pressable onPress={()=>navigation.navigate('Question')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/question.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>问答</Text>
                </Pressable>
                <Pressable style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/home.jpg')}></Image>
                    <Text style={{color:'#63AD64'}}>life</Text>
                </Pressable>
                <Pressable  onPress={()=>{navigation.navigate('AddPost')}} >
                    <Image source={require('../picture/addposts.jpg')}></Image>
                </Pressable>
                <Pressable onPress={()=>{
                    navigation.navigate('AIChat');
                }} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/chat.png')} style={{height:height*0.03,width:height*0.03}}></Image>
                    <Text style={{color:'#A1A8AD'}}>聊天</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('My')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/shape.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>我的</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default function LifeZone(){
    const navigation=useNavigation();
    const [tag,setTag]=useState('推荐');
    const [campusPosts,setCampusPosts]=useState([]);
    async function handleChange(tag){
        try{
            const userId=await AsyncStorage.getItem('userId')
            const token=await AsyncStorage.getItem('token')
            if(tag==='校园'){
                const result=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/campus`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setCampusPosts(result.data.posts);
            }
            else if(tag==='life'){
                const result=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/life`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setCampusPosts(result.data.posts);
            }
            else if(tag==='绘画'){
                const result=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/paint`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setCampusPosts(result.data.posts);
            }
            else if(tag==='美食'){
                const result=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/food`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setCampusPosts(result.data.posts);
            }
            else if(tag==='推荐'){
                const result=await axios.get(`http://8.152.214.138:8080/api/${userId}/post/recommend`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                setCampusPosts(result.data.posts);
            }
        }
        catch(err){
            console.log(err+'失败')
        }
    }
    useEffect(()=>{
        handleChange(tag)
    },[tag])
    return(
        <Framework tag={tag} setTag={setTag}>
            {campusPosts?<LifePosts posts={campusPosts}></LifePosts>:null}
        </Framework>
    );
}