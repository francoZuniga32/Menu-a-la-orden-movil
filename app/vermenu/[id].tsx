import api from '@/api/api';
import ItemMenu from '@/components/item_menu';
import IMenu from '@/models/IMenu';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ITemplate from '@/models/ITemplate';
import template1 from '@/styles/template1';
import template2 from '@/styles/template2';
import template3 from '@/styles/template3';

export default function vermenu() {
  let { id } = useLocalSearchParams<{ id: string }>()

  const [menu, setMenu] = useState<IMenu>({
    id: 0,
    nombre: "",
    template: "",
    idUsuario: 0
  });

  const [items, setItems] = useState([]);

  let styleBase = StyleSheet.create({
    body: {
      backgroundColor: "gray",
      height: "100%",
      padding: 20
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
      // Fuente equivalente multiplataforma
    },
    titulo: {},
    text:{
      fontFamily: 'System'
    }
  });

  const [css, setCss] = useState<ITemplate>(styleBase);
  

  useEffect(() => {
    api.getMenu(parseInt(id)).then(x => x.json()).then(data => {
      setMenu(data)
      setItems(data.items);
      console.log(data);

      switch (data.template) {
        case "template1":
          setCss(template1);
          break;
        case "template2":
          setCss(template2);
          break;
        case "template3":
          setCss(template3);
          break;
        default:
          break;
      }
    });
  });

  return (
    <View style={css.body}>
      {
        items.map((m: any, i: number) => (

          <ItemMenu key={i} id={m.id} itemCss={css.item} tituloCss={css.titulo} textCss={css.text} titulo={m.titulo} precio={m.precio} foto={m.foto} descripcion={m.descripcion} ></ItemMenu>
        ))
      }

    </View>
  )
}

