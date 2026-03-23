import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

import styles from "./style";

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

    
    function editMenu(){
        router.push(`/edit/${id}`);
    };

    return (
        <View style={styles.menu}>
            <TouchableOpacity onPress={editMenu} style={styles.menuBody}>
                <View>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.descripcion}>{descripcion}</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Button title="x" color="red" onPress={() => eliminarMenu(id)}></Button>
            </View>
        </View>
    )
}
