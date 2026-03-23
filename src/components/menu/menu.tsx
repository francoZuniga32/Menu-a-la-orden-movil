import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

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

    //cosas clcikeables
    return (
        <TouchableOpacity style={styles.menu} onPress={verMenu}> 
            <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.descripcion}>{descripcion}</Text>
            </View>
        </TouchableOpacity>
    )
}
