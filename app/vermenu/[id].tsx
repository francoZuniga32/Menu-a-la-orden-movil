import Api from '@/api/api';
import ItemMenu from '@/components/item_menu';
import IMenu from '@/models/IMenu';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import ITemplate from '@/models/ITemplate';
import template1 from '@/styles/template1';
import template2 from '@/styles/template2';
import template3 from '@/styles/template3';

const api = new Api();

export default function vermenu() {
  let { id } = useLocalSearchParams<{ id: string }>()

  const [menu, setMenu] = useState<IMenu>({
    id: 0,
    nombre: "",
    template: "",
    idUsuario: 0
  });

  const [items, setItems] = useState([]);
  const [css, setCss] = useState<ITemplate>(template1);
  
  useEffect(() => {
    api.getMenu(parseInt(id)).then(x => x.json()).then(data => {
      setMenu(data)
      setItems(data.items);

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

