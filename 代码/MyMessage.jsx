import { StyleSheet, Text, View,Image,Pressable,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useRef,useEffect} from 'react';
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    navigation:{
        display:'flex',
        flexDirection:'row',
        height:height*0.04,
        gap:width*0.04
    },
    top:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        height:height*0.12,
        justifyContent:'space-between',
        marginBottom:height*0.03
    },
    textfocused:{
        lineHeight:height*0.04,
        fontSize:width*0.05
    },
    messageImage:{
        marginRight:width*0.03
    },
    message:{
        height:height*0.1,
        width:width*0.9,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:width*0.002,
        borderColor:'grey'
    },
    detail:{
        marginLeft:'auto',
        marginRight:width*0.05,
        height:height*0.03,
        width:height*0.03
    },
})
export default function MyMessage(){
    const navigation=useNavigation();
    return (
        <View>
            <View style={styles.top}>
                <Pressable
                    onPress={()=>{
                        navigation.goBack();
                        }}
                        style={{
                            height:height*0.04,
                            width:height*0.04,
                            marginLeft:width*0.02
                        }}
                >
                    <Image source={require('../图片/返回 (1)(1).png')} style={{height:height*0.025,width:height*0.04,marginTop:height*0.01}}></Image>
                </Pressable>
                <View style={styles.navigation}>
                    <Text style={styles.textfocused}>消息</Text>
                </View>
                <Image source={require('../图片/更多.png')} style={{height:height*0.04,width:height*0.04,marginRight:width*0.02}}></Image>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../图片/点赞消息.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04}}>点赞</Text>
                    <Pressable onPress={()=>{navigation.navigate('SaveRecord')}} style={styles.detail}>
                        <Image source={require('../图片/详情(1).png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../图片/评论消息.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04}}>评论</Text>
                    <Pressable onPress={()=>{navigation.navigate('SaveRecord')}} style={styles.detail}>
                        <Image source={require('../图片/详情(1).png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
            <View  style={{display:'flex',alignItems:'center'}}>
                <View style={styles.message}>
                    <Image source={require('../图片/关注消息.png')} style={styles.messageImage}></Image>
                    <Text style={{fontSize:width*0.04}}>关注</Text>
                    <Pressable onPress={()=>{navigation.navigate('SaveRecord')}} style={styles.detail}>
                        <Image source={require('../图片/详情(1).png')} style={styles.detail}></Image>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}