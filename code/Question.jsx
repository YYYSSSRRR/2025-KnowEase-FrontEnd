import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import QuestionPost from './QuestionPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        width:width*0.064
    },
    content:{
        height:height*0.8,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
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
    postbutton:{
        height:height*0.04,
        width:width*0.2,
        backgroundColor:'#61B15A',
        borderRadius:width*0.02
    },
    buttonText:{
        margin:'auto',
        fontSize:width*0.04,
        color:'white'
    }
})
function Framework({children,isGood,setIsGood,update}){
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
                <Pressable style={styles.postbutton} onPress={()=>{
                    setIsGood(!isGood);
                    update();
                }}>
                    {isGood?<Text style={styles.buttonText}>全部帖</Text>:<Text  style={styles.buttonText}>精华帖</Text>}
                </Pressable>
                <Pressable  style={styles.search} onPress={()=>{navigation.navigate('Search')}}>
                    <Image source={require('../picture/search.jpg')} style={styles.searchPhoto}></Image>
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
                <Pressable style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/questiongreen.png')} style={{height:height*0.03,width:height*0.03}}></Image>
                    <Text style={{color:'#63AD64'}}>问答</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('LifeZone')} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <Image source={require('../picture/life.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>life</Text>
                </Pressable>
                <Pressable  onPress={()=>{navigation.navigate('AddQuestion')}}>
                    <Image source={require('../picture/addposts.jpg')}></Image>
                </Pressable>
                <Pressable onPress={()=>{
                    navigation.navigate('AIChat')
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
    )
}
export default function Qusetion(){
    const [questionPost,setQuestionPost]=useState([]);
    const [isGood,setIsGood]=useState(false);
    const update=async ()=>{
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        if(!isGood){
            axios.post(`http://8.152.214.138:8080/api/QA/getbytag`,{
                tag:"",
                userid:userId
            },{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                console.log('allqa')
                setQuestionPost(response.data.QAPosts);
                
            })
            .catch(err=>{
                console.log(userId,token)
                console.log(err.response.status)
            })
        }
        else{
            axios.post(`http://8.152.214.138:8080/api/QA/getgoodqa`,{
                tag:"",
                userId:userId
            },{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then((response)=>{
                console.log('goodqa')
                setQuestionPost(response.data.QAs);
            })
            .catch(err=>{
                console.log(err.response.status)
                console.log(isGood)
            })
        }
    }
    useEffect(()=>{
        update()
    },[]);
    return(
        <Framework isGood={isGood} setIsGood={setIsGood} update={update}>
            <QuestionPost posts={questionPost}></QuestionPost>
        </Framework>
    )
}