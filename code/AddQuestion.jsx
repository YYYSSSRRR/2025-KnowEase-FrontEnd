import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    navigator:{
        borderColor:'grey',
        borderBottomWidth:1,
        marginTop:height*0.04,
        height:height*0.07,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    navigatorText:{
        lineHeight:height*0.035,
        marginRight:width*0.03,
        marginLeft:width*0.03,
        fontSize:width*0.04,
        color:'white'
    },
    postButton:{
        backgroundColor:'#61B15A',
        marginRight:width*0.01,
        width:width*0.15,
        height:height*0.035,
        borderRadius:width*0.03,
    },
    navigatorTitle:{
        fontSize:width*0.06,
        color:'#B1B1B9'
    },
    returnButton:{
        height:height*0.04,
        width:width*0.08
    },
    textInput:{
        width:width*0.8,
        height:height*0.05,
        backgroundColor:'white',
        borderRadius:width*0.02
    },
    inputText:{
        fontSize:width*0.045,
        marginBottom:height*0.01,
        marginTop:height*0.02
    },
    textInputContent:{
        width:width*0.8,
        height:height*0.1,
        backgroundColor:'white',
        borderRadius:width*0.02
    }
})
export default function AddQuestion(){
    const navigation=useNavigation();
    const [question,setQuestion]=useState('');
    const [tag,setTag]=useState('');
    const [similiar,setSimilar]=useState(false);
    const [similiarid,setSimilarid]=useState('');
    async function handleSimilar(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        console.log(111)
        axios.post(`http://8.152.214.138:8080/api/${userId}/QA/similarity`,{
            question:question,
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            if(response.data.similarity==1){
                setSimilar(true);
                setSimilarid(response.data.PostIDs);
                console.log(response.data.PostIDs)
            }
            else{
                handleSubmit();
            }
        })
        .catch(err=>{console.log(err.request)});
    }
    async function handleSubmit(){
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        
        axios.post(`http://8.152.214.138:8080/api/${userId}/QA/publish`,{
            question:question,
            tag:tag
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            if(!similiar){
                navigation.navigate('Question');
            }
            
        })
        .catch(err=>{console.log(err)})
    }
    return(
        <View>
            <View style={styles.navigator}>
                <Pressable style={{marginLeft:width*0.01}} onPress={()=>{navigation.goBack()}}>
                    <Image source={require('../picture/return.png')} style={styles.returnButton}></Image>
                </Pressable>
                <Text style={styles.navigatorTitle}>问答</Text>
                <Pressable style={styles.postButton} onPress={handleSimilar}>
                    <Text style={styles.navigatorText}>发布</Text>
                </Pressable>
            </View>
            <View style={{marginLeft:width*0.05}}>
                <Text style={styles.inputText}>问题</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='请写下你的问题...'
                    value={question}
                    onChange={e=>{
                        setQuestion(e.nativeEvent.text)
                    }}
                ></TextInput>
            </View>
            <View style={{marginLeft:width*0.05}}>
                <Text style={styles.inputText}>标签</Text>
                <TextInput 
                    style={styles.textInput}
                    value={tag}
                    onChange={e=>{
                        setTag(e.nativeEvent.text)
                    }}
                ></TextInput>
            </View>
            {similiar&&
            <View style={{marginLeft:width*0.04,marginTop:height*0.02}}>
                <View style={{marginBottom:height*0.02}}>
                    <Text style={{fontSize:width*0.04}}>有相似问答，需要跳转还是发布？</Text>
                </View>
                
                <View style={{display:'flex',flexDirection:'row',gap:width*0.05,height:height*0.05}}>
                    <Pressable onPress={()=>{navigation.navigate('QuestionDetail',{
                        PostID:similiarid
                    })}} style={styles.postButton}>
                        <Text style={{lineHeight:height*0.05,fontSize:width*0.04,lineHeight:height*0.035,color:'white',textAlign:'center'}}>跳转</Text>
                    </Pressable>
                    <Pressable onPress={handleSubmit} style={styles.postButton}>
                        <Text style={{lineHeight:height*0.05,fontSize:width*0.04,lineHeight:height*0.035,color:'white',textAlign:'center'}}>发布</Text>
                    </Pressable>
                </View>
            </View>}
        </View>
        
    )
}