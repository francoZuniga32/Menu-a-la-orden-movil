import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, useWindowDimensions, ViewStyle } from "react-native";
import RenderHtml from 'react-native-render-html';

type style = {
    body: ViewStyle,
    parrafo: ViewStyle,
    item: ViewStyle
}

type Props = PropsWithChildren<{
  id: number,
  titulo: string,
  precio: number,
  foto: string,
  descripcion: string,
  itemCss: StyleProp<ViewStyle>
}>;

export default function ItemMenu({
        id,
        titulo,
        precio,
        foto,
        descripcion,
        itemCss
    }:Props){
    const { width } = useWindowDimensions();
    const source = {
        html: descripcion
    };
    
    return (
        <TouchableOpacity style={itemCss}>
            <Text style={styles.titulo}>{titulo} - $ {precio} </Text>
            <RenderHtml contentWidth={width} source={source}></RenderHtml>
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
