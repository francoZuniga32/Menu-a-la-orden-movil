import api from '@/api/api';
import ItemMenu from '@/components/item_menu';
import IMenu from '@/models/IMenu';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function vermenu() {
  let { id } = useLocalSearchParams<{ id: string }>()

  const [menu, setMenu] = useState<IMenu>({
    id: 0,
    nombre: "",
    template: "",
    idUsuario: 0
  });

  const [items, setItems] = useState([]);

  useEffect(()=>{
    api.getMenu(parseInt(id)).then( x => x.json()).then(data => {
      setMenu(data)
      setItems(data.items);
      
    });  
  });

  return (
    <View style={css.body}>
      <Text style={css.parrafo}>{menu.nombre}</Text>
      {
        items.map((m:any, i:number)=>(
          
          <ItemMenu key={i} id={m.id} itemCss={css.item} titulo={m.titulo} precio={m.precio} foto={m.foto} descripcion={m.descripcion} ></ItemMenu>
        ))
      }
      
    </View>
  )
}

const css = StyleSheet.create({
  body:{
    margin: 20
  },
  parrafo:{
    color: "white"
  },
  item: {
    backgroundColor: "#a3e635",
    borderRadius: 8,          // .5rem ≈ 8px
    borderWidth: 3,
    borderColor: "black",

    // Sombra (equivalente a drop-shadow)
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 7, // Android

    padding: 16,              // 1rem ≈ 16px
    marginBottom: "2%",

    fontFamily: "System",     // Fuente equivalente multiplataforma
  },
});
