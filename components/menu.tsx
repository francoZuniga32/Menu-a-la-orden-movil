import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = PropsWithChildren<{
  id: number | null,
  titulo: string,
  descripcion: string
}>;

export default function Menu({
    id,
    titulo,
    descripcion
}:Props){

    
    function verMenu(){
        router.push(`/vermenu/${id}`);
    };

    return (
        <TouchableOpacity style={styles.menu} onPress={verMenu}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menu:{
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        padding: 5
    },
    titulo:{
        color: "#fff",
        fontSize: 20,
    },
    descripcion:{
        color: "#fff"
    }
})