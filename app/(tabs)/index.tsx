import api from '@/api/api';
import Menu from '@/components/menu';
import IMenu from '@/models/IMenu';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useEffect, useState } from 'react';

import styles from "@/styles/css";

export default function HomeScreen() {
  
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(()=>{
    api.getMenus().then(x => x.json()).then(data => setMenus(data));
  })


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/cocinerosEsperando.jpg')}
          style={styles.reactLogo}
        />
      }>
      <View style={{display: "flex", justifyContent: "center"}}>
        <Text style={styles.title}>Menu a la Orden</Text>
      </View>
      <View>
        {
          menus.map((m, i) => (
            <Menu key={i} id={m.id} titulo={m.nombre} descripcion='descripcion'></Menu>
          ))
        }
      </View>
    </ParallaxScrollView>
  );
}

