import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
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
        marginLeft:width*0.03
    },
    search:{
        marginRight:width*0.03
    },
    searchPhoto:{
        height:height*0.03,
        width:width*0.07
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
        shadowColor:'green'
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
        marginLeft:width*0.01
    },
    bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        height:height*0.07,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'grey',
        padding:height*0.01
    }
})

export default function LifeZone(){
    const [imageUrl,setImageUrl]=useState('http://sqe95hxoa.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250122122348.jpg')
    useEffect(()=>{
        const fetchurl=async ()=>{
            try{
                const storeImageUrl=await AsyncStorage.getItem('imageUrl')
                if(storeImageUrl){
                    setImageUrl(storeImageUrl)
                    console.log(storeImageUrl)
                }
            }
            catch(error){
                console.log(error)
            }
        };
        fetchurl();
    },[])
    const navigation=useNavigation();
    return(
        <View>
            {/* {uri:'http://sqe95hxoa.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250122122348.jpg'} */}
            <View style={styles.head}>
                <Image source={{uri:'http://sqe95hxoa.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250122122348.jpg'}} style={styles.profilePhoto} ></Image>
                <Image source={require('./logo_proc.jpg')} style={styles.logo}></Image>
                <Pressable  style={styles.search}>
                    <Image source={require('./Search_proc.jpg')} style={styles.searchPhoto}></Image>
                </Pressable>
            </View>
            <View style={styles.navigation}>
                <Text style={styles.navigationText}>关注</Text>
                <Text style={styles.navigationText}>推荐</Text>
                <Text style={styles.navigationText}>美食</Text>
                <Text style={styles.navigationText}>绘画</Text>
                <Text style={styles.navigationText}>生活</Text>
                <Text style={styles.navigationText}>校园</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.passage}>
                    <Image source={require('./组 12391_proc.jpg')} style={styles.passageImage}></Image>
                    <View style={styles.passageTitle}>
                        <Image source={require('./头像_proc.jpg')} style={styles.passageTitleProfile}></Image>
                        <View style={{marginLeft:width*0.03}}>
                            <Text style={{fontSize:width*0.04,marginBottom:height*0.01}}>我的学习日常</Text>
                            <Text style={{fontSize:width*0.03}}>张景昕</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',position:'absolute',right:width*0.04}}>
                            <Image source={require('./Path_34179_proc.jpg')} ></Image>
                            <Text style={{marginLeft:width*0.02}}>12</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.passage}>
                    <Image source={require('./组 12391_proc.jpg')} style={styles.passageImage}></Image>
                    <View style={styles.passageTitle}>
                        <Image source={require('./头像_proc.jpg')} style={styles.passageTitleProfile}></Image>
                        <View style={{marginLeft:width*0.03}}>
                            <Text style={{fontSize:width*0.04,marginBottom:height*0.01}}>我的学习日常</Text>
                            <Text style={{fontSize:width*0.03}}>张景昕</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',position:'absolute',right:width*0.04}}>
                            <Image source={require('./Path_34179_proc.jpg')} ></Image>
                            <Text style={{marginLeft:width*0.02}}>12</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <Pressable>
                    <Image source={require('./组 12334_proc.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>问答</Text>
                </Pressable>
                <Pressable>
                    <Image source={require('./组 12379_proc.jpg')}></Image>
                    <Text style={{color:'#63AD64'}}>生活</Text>
                </Pressable>
                <Pressable  onPress={()=>{navigation.navigate('AddPost')}}>
                    <Image source={require('./组 12324_proc.jpg')}></Image>
                </Pressable>
                <Pressable>
                    <Image source={require('./Iconly／Regular／Outline／Chat_proc.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}>聊天</Text>
                </Pressable>
                <Pressable>
                    <Image source={require('./形状_proc.jpg')}></Image>
                    <Text style={{color:'#A1A8AD'}}> 我的</Text>
                </Pressable>
            </View>
        </View>
    )
}