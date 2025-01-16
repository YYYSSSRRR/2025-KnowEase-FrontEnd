import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useRef, useState} from 'react';
import axios from 'axios';
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        marginTop:height*0.15
    },
    input:{
        borderColor:'black',
        height:height*0.04,
        borderWidth:0.5,
        width:width*0.5,
        borderRadius:5,
        marginBottom:height*0.01
    },
    pwForget:{
        display:'flex',
        alignSelf:'flex-end',
        color:'#929EB2'
    }
})
export default function Login(){
    const navigation=useNavigation()
    const ref=useRef()
    const [pwLogin,setPwLogin]=useState(true)
    const[isChecked,setIsChecked]=useState(false)
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    function handleSubmit1(){
        axios.post('http://8.152.214.138:8080/api/login/bypassword',{
            email:email,
            password:password
        })
        .then(()=>{
            navigation.navigate('Agreement')
        })
        .catch(error=>{
            console.log({email,password})
            console.log(error)
        })
    }
    function Input1(){
        return(  
            <View style={{width:width*0.5,display:'flex'}}>
                <TextInput
                    ref={ref}
                    style={styles.input}
                    placeholder='输入Email'
                    value={email}
                   onChangeText={
                    (text)=>{
                        setEmail(text)
                    }
                   }
                />
                <TextInput
                    style={styles.input}
                    placeholder='输入密码'
                    value={password}
                    onChange={e=>{
                        setPassword(e.nativeEvent.text)
                    }}
                ></TextInput>
                <Text style={styles.pwForget}>忘记密码？</Text>
            </View>
        )
    }
    function Input2(){
        return(
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='输入Email'
                ></TextInput>
                <View style={{width:width*0.5}}>
                    <TextInput
                        style={styles.input}
                        placeholder='输入验证码'
                    >
                    </TextInput>
                    <Pressable style={{position:'absolute',right:5}}
                        onPress={()=>navigation.navigate('Agreement')}
                    >
                        <Text style={{lineHeight:height*0.04,color:'grey'}}>获取验证码</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
    function Framework({children}){
        return(
            <View style={styles.container}>
                <Image source={require('./logo_proc.jpg')}
                    style={{width:width*0.2,height:height*0.1,marginBottom:height*0.03}}
                ></Image>
                <Text
                    style={{fontSize:width*0.08}}
                >登录</Text>
                <View style={{display:'flex',flexDirection:'row',gap:width*0.05,marginTop:height*0.03,marginBottom:height*0.03}}>
                    <Pressable style={{borderRightWidth: 1,borderRightColor: '#ccc',paddingRight:width*0.04}}
                        onPress={()=>{
                            setPwLogin(true)
                        }}
                    >
                        <Text style={{fontSize:width*0.05,color:pwLogin?'black':'#929EB2'}}
                        >密码登录</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        setPwLogin(false)
                    }}>
                        <Text style={{fontSize:width*0.05,color:pwLogin?'#929EB2':'black'}}>邮箱登录</Text>
                    </Pressable>
                </View>
                <View>
                    {children}
                </View>
                <View style={{display:'flex',flexDirection:'row',marginTop:height*0.05}}>
                    <Pressable
                        style={{width:width*0.04,height:width*0.04,borderColor:'black',borderWidth:1,marginTop:height*0.02,marginRight:width*0.03}}
                        onPress={()=>{setIsChecked(!isChecked)}}
                    >
                        {isChecked&&<Text style={{lineHeight:width*0.04,textAlign:'center',fontSize:width*0.04}}>√</Text>}
                    </Pressable>
                    <Text style={{lineHeight:width*0.04,marginTop:height*0.02,fontSize:width*0.03}}>已阅读并同意</Text>
                    <Pressable >
                        <Text style={{lineHeight:width*0.04,marginTop:height*0.02,fontSize:width*0.03,color:'red'}}>用户协议、隐私政策</Text>
                    </Pressable>
                    
                </View>
                <Pressable
                    style={{backgroundColor:'#61B15A',width:width*0.7,height:height*0.06,borderRadius:10,marginBottom:height*0.01,marginTop:height*0.04}}
                    onPress={handleSubmit1}
                >
                    <Text
                        style={{lineHeight:height*0.06,textAlign:'center',color:'white',fontSize:20}}
                    >立即登录</Text>
                </Pressable>
                <Pressable>
                    <Text
                        style={{color:'grey',fontSize:height*0.016}}
                    >还没有账号?去注册</Text>
                </Pressable>
                <Image
                    source={require('./树叶bg.png')}
                    style={{width:width,height:height*0.3}}
                ></Image>
            </View>
        )
    }
    return(
        <Framework>
            <View>
                {pwLogin?<Input1/>:<Input2/>}
            </View>
        </Framework>
    )
}