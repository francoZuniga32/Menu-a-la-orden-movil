import { Alert, Button, Text } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import api from '@/services/api';
import { useState } from 'react';
import { TextInput } from 'react-native';

import keys from '@/services/claves';
import { router } from 'expo-router';

import styles from "@/styles/css";

export default function Ingresar() {
  const [usuario, setUsuario] = useState('');
  const [contasenia, setContasenia] = useState('');
  const [user, setUser] = useState();

  const [token, setToken] = useState<string | null | undefined>('');

  function Ingresar(){
    api.ingresar(usuario, contasenia)
      .then(response => { 
        if(!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => { 
        await keys.addToken(data.token);
        await keys.addUser(JSON.stringify(data.user));

        setUser(data.user);
        router.push('/dashboard');
      })
      .catch(() => { 
        Alert.alert('Error', 'El usuario o contraseña no son correctos.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }

  const registrarme = ()=>{
    router.push('/registrar');
  }

  /* async function ObtnerToken(){ //TODO  no se usa nunca xd
    let token = await keys.getToken();
    console.log(token);
    setToken(token);
  } */

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <Text style={styles.parrafo}>Usuario</Text>
      <TextInput onChangeText={setUsuario} style={styles.input}></TextInput>
      <Text style={styles.parrafo}>Contraseña</Text>
      <TextInput onChangeText={setContasenia} secureTextEntry={true} style={styles.input}></TextInput>
      <Button
        onPress={() => Ingresar()}
        title="Ingresar"
        accessibilityLabel="Learn more about this purple button"
      />
      
      <Button
        onPress={() => registrarme()}
        title="Registrarme"
        accessibilityLabel=""
      />
    </ParallaxScrollView>
  );
}


