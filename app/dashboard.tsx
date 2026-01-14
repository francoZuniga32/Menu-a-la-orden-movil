import { StyleSheet, Text, View } from "react-native"

export default function Dashboard(){
    return (
        <View style={styles.body}>
            <Text>Hola mundo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        margin: 20
    }
})