import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uploadQiniu from '../src/utils/uploadQiniu';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    returnButton:{
        height:height*0.025,
        width:height*0.04,
        marginLeft:width*0.05
    },
    profile:{
        height:height*0.1,
        width:height*0.1,
        borderRadius:height*0.1,
        margin:'auto',
        marginTop:height*0.03
    },
    editButton:{
        height:height*0.03,
        width:height*0.04,
        marginRight:width*0.05
    },
    top:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:height*0.06    
    },
    profileEditButton:{
        height:height*0.03,
        width:height*0.03,
        marginLeft:width*0.55,
        position:'relative',
        bottom:height*0.02
    },
    editIcon:{
        height:height*0.03,
        width:width*0.05
    },
    input:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
})
export default function EditInformation(){
    const [profile,setProfile]=useState('');
    const [editStatus,setEditStatus]=useState(true);
    const [backgroundEditStatus,setBackgroundEditStatus]=useState(true)
    const [nameEditStatus,setNameEditStatus]=useState(true);
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [backgroundImage,setBackgroundImage]=useState('');
    const navigation=useNavigation();
    async function uploadQiniu(file,key){
        const tokenData=await AsyncStorage.getItem('token');
        try{
            const uploadToken=await axios.get('https://mini.knowease2025.com/api/getToken',{
                headers:{
                    'Authorization':`Bearer ${tokenData}`
                }
            });
            // console.log(uploadToken.data.token);
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
            .then(response=>{
                const data=response.data;
                if(key==='profile'){
                    setProfile('https://mini-project.muxixyz.com/'+data.key);
                }
                else if(key==='background'){
                    setBackgroundImage('https://mini-project.muxixyz.com/'+data.key)
                }
            })
            .catch(error=>{
                console.log(error,'失败');
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
        catch(error){
            console.log(error)
        }
    
    }
    const requestPermission=async ()=>{
            const {status}=await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status!=='granted'){
                Alert.alert('Permission required', 'You need to grant access to the photo library')
                return false;
            }
            return true;
        };
    const pickImage=async(key)=>{
        const permissionGranted=await requestPermission();
        if(!permissionGranted) return;
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:'images',
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });
        if(!result.canceled){
            const file={
                uri:result.assets[0].uri,
                type:result.assets[0].mimeType,
                name:result.assets[0].fileName
            }
            await uploadQiniu(file,key);
        }
        if(key==='profile'){
            setEditStatus(!editStatus);
        }
        else if(key==='background'){
            setBackgroundEditStatus(!backgroundEditStatus);
        }
    }
    async function handleSubmit(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`https://mini.knowease2025.com/api/${userId}/userpage/alterimage`,{
            url:profile
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            console.log('上传成功');
            setEditStatus(!editStatus);
            AsyncStorage.setItem('profile',profile)
        })
        .catch(err=>console.log(err))
    }
    async function handleChangeBackground(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`https://mini.knowease2025.com/api/${userId}/userpage/alterbackground`,{
            backgroundURL:backgroundImage
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            setBackgroundEditStatus(!backgroundEditStatus);
            AsyncStorage.setItem('backgroundImage',backgroundImage)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    async function handleChangeName() {
        console.log('正在修改')
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        await axios.post(`https://mini.knowease2025.com/api/${userId}/userpage/alterusername`,{
            username:username
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            console.log('修改');
            setNameEditStatus(!nameEditStatus);
            AsyncStorage.setItem('userName',username)
        })
        .catch(err=>console.log(err));
    }   
    useEffect(()=>{
        const fetchProfile=async()=>{
            const profile=await AsyncStorage.getItem('profile');
            const username=await AsyncStorage.getItem('userName');
            const email=await AsyncStorage.getItem('email');
            const backgroundImage=await AsyncStorage.getItem('backgroundImage')
            setProfile(profile);
            setUsername(username);
            setEmail(email);
            setBackgroundImage(backgroundImage)
        }
        fetchProfile();
    },[])
    return(
        <View>
            <View style={styles.top}>
                <Pressable onPress={()=>{
                    navigation.navigate('My')
                }}>
                    <Image source={require('../picture/return.png')} style={styles.returnButton}></Image>
                </Pressable>
                <Text style={{fontSize:width*0.045}}>个人信息</Text>
                <Image source={require('../picture/edittwo.png')} style={styles.editButton}></Image>
            </View>
            <Image source={{uri:profile}} style={styles.profile}></Image>
            <Pressable
                onPress={editStatus?()=>{pickImage('profile')}:handleSubmit}
            >
                <Image source={editStatus?require('../picture/editone.png'):require('../picture/submittwo.png')} style={styles.profileEditButton}></Image>
            </Pressable>
            <View style={{marginLeft:width*0.04}}>
                <View>
                    <Text
                        style={{fontSize:width*0.04,color:'#A4A4A4'}}
                    >用户名</Text>
                    <View style={styles.input}>
                        {nameEditStatus?
                        <View>
                            <Text style={{width:width*0.8,height:height*0.05,lineHeight:height*0.05,fontSize:width*0.04}}>{username}</Text>
                        </View>
                        :
                        <TextInput 
                            style={{width:width*0.8,height:height*0.05,fontSize:width*0.04}}
                            value={username}
                            onChangeText={text=>setUsername(text)}
                        ></TextInput>}
                        <Pressable
                            onPress={()=>{
                                if(nameEditStatus){
                                    setNameEditStatus(!nameEditStatus);
                                }
                                if(!nameEditStatus){
                                    handleChangeName();
                                }
                            }}
                        >
                            <Image source={nameEditStatus?require('../picture/edittwo.png'):require('../picture/submitsucces.png')} style={styles.editIcon}></Image>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text
                        style={{fontSize:width*0.04,color:'#A4A4A4'}}
                    >
                        邮箱
                    </Text>
                    <View style={styles.input}>
                        <Text style={{width:width*0.8,height:height*0.05,lineHeight:height*0.05,fontSize:width*0.04}} >{email}</Text>
                        <Pressable
                            onPress={()=>{
                                navigation.navigate('ChangeEmail')
                            }}
                        >
                            <Image source={require('../picture/edittwo.png')} style={styles.editIcon}></Image>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text
                        style={{fontSize:width*0.04,color:'#A4A4A4'}}
                    >
                        密码
                    </Text>
                    <View style={styles.input}>
                        <Text style={{width:width*0.8,height:height*0.05,lineHeight:height*0.05,fontSize:width*0.04}} >******</Text>
                        <Pressable
                            onPress={()=>{
                                navigation.navigate('ChangePassword')
                            }}
                        >
                            <Image source={require('../picture/edittwo.png')} style={styles.editIcon}></Image>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text
                        style={{fontSize:width*0.04,color:'#A4A4A4'}}
                    >
                        背景图
                    </Text>
                    <View style={styles.input}>
                        <Image source={{uri:backgroundImage}} style={{height:height*0.1,width:width*0.3,marginTop:height*0.02,marginRight:width*0.5}}></Image>
                        <Pressable onPress={backgroundEditStatus?()=>{pickImage('background')}:handleChangeBackground}>
                            <Image source={backgroundEditStatus?require('../picture/edittwo.png'):require('../picture/submitsucces.png')} style={styles.editIcon}></Image>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
