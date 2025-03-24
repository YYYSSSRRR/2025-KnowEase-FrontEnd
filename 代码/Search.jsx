import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext, ScrollView } from 'react-native';
import { useState,useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuessSearch from './GuessSearch';
import HotList from './HotList';
import SearchRecord from './SearchRecord';
import SearchResult from './SearchResult';
import LifeZone from './LifeZone';
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
        borderRadius:width*0.04
        
    },
    deleteicon:{
        height:height*0.04,
        width:width*0.08
    }
})
export default function Search(){
    const navigation=useNavigation();
    const [searchWord,setSearchWord]=useState('');
    const [postMap,setPostMap]=useState([]);
    const [qaMap,setQaMap]=useState([]);
    const [hotList,setHotList]=useState([]);
    const [searchRecord,setSearchRecord]=useState([]);
    const [guessSearch,setGuessSearch]=useState([]);
    async function handleSearch(text) {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/search`,{
            searchmessage:text,
            userid:userId
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            setPostMap(response.data.posts);
            setQaMap(response.data.QAs);
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    async function handleGetList() {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.get(`http://8.152.214.138:8080/api/search/gethotrank`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            setHotList(response.data.hot)
            console.log('获取成功')
        })
        .catch(err=>{console.log(err)})
    }
    async function handleClickSearch(text) {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/search/syncRecord`,{
            searchmessage:text,
            userid:userId
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(()=>{
            navigation.navigate('SearchPostResult',{
                lifepost:postMap,
                qapost:qaMap
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    async function handleGetSearchRecord() {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.get(`http://8.152.214.138:8080/api/search/${userId}/getrecord`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response=>{
            setSearchRecord(response.data.records);
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    async function handleGuessSearch() {
        const userId=await AsyncStorage.getItem('userId');
        const token=await AsyncStorage.getItem('token');
        axios.post(`http://8.152.214.138:8080/api/search/${userId}/recommend`,{},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
            setGuessSearch(JSON.parse(response.data.recommendSearch));
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        handleGetList();
        handleGetSearchRecord();
        handleGuessSearch();
    },[])
    return(
        <View>
            <View style={styles.top}>
                <Pressable onPress={()=>{navigation.navigate('LifeZone')}} >
                    <Image source={require('../图片/返回 (1)(1).png')} style={styles.icon}></Image>
                </Pressable>
                <TextInput 
                    style={styles.textinput}
                    value={searchWord}
                    onChangeText={(text)=>{
                        setSearchWord(text);
                        handleSearch(text);
                    }
                    }
                ></TextInput>
                <Pressable
                    onPress={()=>{
                        handleClickSearch(searchWord);
                        handleGetSearchRecord();
                    }}
                >
                    <Text style={{fontSize:width*0.045}}>搜索</Text>
                </Pressable>
            </View>
            {searchWord?<SearchResult postMap={postMap} qaMap={qaMap}></SearchResult>:
            <View>
                <ScrollView>
                    <SearchRecord searchRecord={searchRecord}  handleGetSearchRecord={handleGetSearchRecord} handleSearch={handleSearch} postMap={postMap} qaMap={qaMap}></SearchRecord>
                    <GuessSearch handleGuessSearch={handleGuessSearch} guessSearch={guessSearch}></GuessSearch>
                    <HotList hotList={hotList}></HotList>
                </ScrollView>
            </View>
            }
        </View>
    )
}