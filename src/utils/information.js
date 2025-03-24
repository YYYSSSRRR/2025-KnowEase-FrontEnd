import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function getItem(key) {
    const result=await AsyncStorage.getItem(`${key}`);
    return result;
}