import { StyleSheet, Text, View,Image,Pressable,Dimensions,TextInput,createContext } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
const {width,height}=Dimensions.get('window')
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
    postPicture:{
        backgroundColor:'white',
        width:width*0.4,
        height:width*0.4,
        position:'absolute',
        left:width*0.3,
        top:height*0.2,
        borderRadius:width*0.04,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    addPicture:{
        width:width*0.08,
        height:width*0.08,
        marginBottom:height*0.01
    },
    pictureText:{
        color:'#626262',
        fontSize:width*0.043
    },
    addText:{
        position:'absolute',
        top:height*0.41,
        marginLeft:width*0.07
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
    },
})
export default function AddPost(){
    const navigation=useNavigation();
    const [open,setOpen]=useState(false)
    const [value,setValue]=useState('')
    const items=[
        {label:'校园',value:'校园'},
        {label:'美食',value:'美食'},
        {label:'绘画',value:'绘画'},
        {label:'生活',value:'生活'}
    ]
    return(
        <View>
            <View style={styles.navigator}>
                <Pressable style={{marginLeft:width*0.01}} onPress={()=>{navigation.navigate('LifeZone')}}>
                    <Image source={require('./Group 5_proc.jpg')}></Image>
                </Pressable>
                <Text style={styles.navigatorTitle}>生活</Text>
                <Pressable style={styles.postButton}>
                    <Text style={styles.navigatorText}>发布</Text>
                </Pressable>
            </View>
            <View style={styles.postPicture}>
                <Pressable>
                    <Image source={require('./7b66310c-d257-4d23-b58b-7587030e7daf.png')} style={styles.addPicture}></Image>
                </Pressable>
                <Text style={styles.pictureText}>照片</Text>
            </View>
            <View style={styles.addText}>
                <View>
                    <Text style={styles.inputText}>标题</Text>
                    <TextInput style={styles.textInput} placeholder='填写标题更容易让其他人看见哦...'></TextInput>
                </View>
                <View>
                    <Text style={styles.inputText}>内容</Text>
                    <TextInput style={styles.textInputContent} placeholder='写下你的内容' multiline={true}></TextInput>
                </View>
                <View>
                    <Text style={styles.inputText}>标签</Text>
                    <DropDownPicker
                        value={value}
                        setValue={setValue}
                        open={open}
                        setOpen={setOpen}
                        placeholder='请选择一个标签'
                        items={items}
                        style={{width:width*0.8,borderColor:'white'}}
                        dropDownContainerStyle={{borderColor:'white'}}
                    />
                </View>
            </View>
            
        </View>
    )
}