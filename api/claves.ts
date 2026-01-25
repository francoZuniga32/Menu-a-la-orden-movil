import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    async addToken(token:string){
        // Store the credentials
        await AsyncStorage.setItem('userToken', token);
    },

    async getToken(){
        try {
            const token = await AsyncStorage.getItem('userToken');
            return token;
        } catch (error) {
            console.error("Failed to access Keychain", error);
        }
    },

    async addUser(usaurio:string){
        try{
            await AsyncStorage.setItem('user', usaurio);
        }catch(err){
            console.error("Fallo");
        }
    },
    async getUser(){
        try{
            const token = await AsyncStorage.getItem('user');
            return token;
        }catch(err){
            console.error("Fallo");
        }
    }
};
