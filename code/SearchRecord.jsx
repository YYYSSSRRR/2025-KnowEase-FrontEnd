import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    top:{
        marginTop:height*0.06,
        marginLeft:width*0.05,
        width:width*0.9,
        marginRight:width*0.05,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:width*0.05,
        height:height*0.1,
        
    },
    icon:{
        height:height*0.03,
        width:width*0.06,
        
    },
    textinput:{
        borderWidth:1,
        width:width*0.7,
        height:height*0.04,
        borderRadius:width*0.05,
        backgroundColor:'#D6EBD5',
        borderColor:'#61B15A'
    },
    alldelete:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:width*0.1,
        marginRight:width*0.1
    },
    searchRecord:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        width:width*0.33,
        justifyContent:'center',
        borderColor:'grey',
        borderRadius:width*0.04,
        height:height*0.04,
        
    },
    deleteicon:{
        height:height*0.04,
        width:width*0.08
    },
    delete:{
        height:height*0.025,
        width:width*0.06

    }
})
export default function SearchRecord({searchRecord,handleGetSearchRecord}){
    const [deleteStatus,setDeleteStatus]=useState(false);

    const navigation=useNavigation();
    async function handleDeleteAll() {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.delete(`http://8.152.214.138:8080/api/search/${userId}/deleteall`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            console.log('删除全部成功');
            handleGetSearchRecord();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    async function handleSearch(message) {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/search`,{
            searchmessage:message,
            userid:userId
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            
            navigation.navigate('SearchPostResult',{
                lifepost:response.data.posts,
                qapost:response.data.QAs
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    async function handleDelete(message) {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/search/delete`,{
            searchmessage:message,
            userid:userId
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            console.log('删除成功');
            handleGetSearchRecord();
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <View>
            
            <View style={styles.alldelete}>
                <Text style={{fontSize:width*0.04}}>历史记录</Text>
                {deleteStatus?<View style={{display:'flex',flexDirection:'row',gap:width*0.03}}>
                    <Pressable onPress={handleDeleteAll}>
                        <Text style={{fontSize:width*0.04,color:'grey'}}>全部删除</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setDeleteStatus(!deleteStatus)}}>
                        <Text style={{fontSize:width*0.04,color:'grey'}}>取消</Text>
                    </Pressable>
                </View>:
                <View>
                    <Pressable onPress={()=>{setDeleteStatus(!deleteStatus)}}>
                        <Image source={require('../picture/searchdelete.png')} style={styles.delete}></Image>
                    </Pressable>
                </View>}
                
            </View>
            <View style={{marginTop:height*0.02,marginLeft:width*0.05,display:'flex',flexWrap:'wrap',flexDirection:'row',gap:width*0.03}}>
                {searchRecord.map((a,index)=>{
                    return(
                        <View style={styles.searchRecord} key={index}>
                            <Pressable onPress={()=>{
                                handleSearch(a.searchmessage)
                            }}>
                                <Text style={{fontSize:width*0.04}}>{a.searchmessage}</Text>
                            </Pressable>
                            {deleteStatus&&<Pressable onPress={()=>{
                                handleDelete(a.searchmessage);
                                handleGetSearchRecord();
                            }}>
                                <Image source={require('../picture/cancel.png')} style={styles.deleteicon}></Image>
                            </Pressable>}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}