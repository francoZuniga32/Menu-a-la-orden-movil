import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  id: number | null,
  titulo: string,
  descripcion: string,
  eliminarMenu: (id: number | null) => void,
}>;

export default function MenuEdit({
    id,
    titulo,
    descripcion,
    eliminarMenu
}:Props){

    
    function verMenu(){
        router.push(`/vermenu/${id}`);
    };

    return (
        <View style={styles.menu}>
            <View style={styles.menuBody}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.descripcion}>{descripcion}</Text>
            </View>
            <View>
                <Button title="x" color="red" onPress={() => eliminarMenu(id)}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu:{
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        padding: 5,
        display: "flex",
        flexDirection: "row"
    },
    menuBody:{
        width: "90%"
    },
    titulo:{
        color: "#fff",
        fontSize: 20,
    },
    descripcion:{
        color: "#fff"
    }
})