import * as ImagePicker from 'expo-image-picker';

const media = {
    pickFile : async ()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (result.canceled) return null;

        return result.assets[0];
    }
}

export default media;
