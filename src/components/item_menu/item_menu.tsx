import api from "@/services/api";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
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
  itemCss: StyleProp<ViewStyle>,
  tituloCss: StyleProp<TextStyle>,
  textCss: StyleProp<TextStyle>
}>;
//creo los estilos con styleprop
export default function ItemMenu({
        id,
        titulo,
        precio,
        foto,
        descripcion,
        itemCss,
        tituloCss,
        textCss
    }:Props){
    const { width } = useWindowDimensions();
    const source = {
        html: descripcion
    };
    
    return (
        <TouchableOpacity style={itemCss}>
            <View style={{display: "flex",flexDirection: "row"}}>
                <View style={{width: "20%"}}>
                    <Image style={{ width: 60, height: 60 }} source={{uri: foto ? api.baseUrl+"/"+foto : ""}}></Image>
                </View>
                <View style={{width: "80%"}}>
                    <Text style={tituloCss}>{titulo} - $ {precio} </Text>
                    <RenderHtml contentWidth={width} source={source}></RenderHtml>
                </View>
            </View>
        </TouchableOpacity>
    )
}