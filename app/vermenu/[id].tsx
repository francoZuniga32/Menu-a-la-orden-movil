import api from '@/api/api';
import ItemMenu from '@/components/item_menu';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function vermenu() {
  let { id } = useLocalSearchParams<{ id: string }>()

  const [menu, setMenu] = useState({});
  const [items, setItems] = useState([]);
  const [css, setCss] = useState<StyleSheet | null>();

  useEffect(()=>{
    api.getMenu(id).then( x => x.json()).then(data => {
      setMenu(data)
      setItems(data.items);
      switch(data.template){
        case 'template_1.css':
          setCss(template1);
        break;
      }
    });  
  });

  return (
    <View style={css.body}>
      <Text style={css.parrafo}>{menu.nombre}</Text>
      {
        items.map((m:any, i:number)=>(
          
          <ItemMenu key={i} css={css} titulo={m.titulo} precio={m.precio} foto={m.foto} descripcion={m.descripcion} ></ItemMenu>
        ))
      }
      
    </View>
  )
}

const template1 = StyleSheet.create({
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
