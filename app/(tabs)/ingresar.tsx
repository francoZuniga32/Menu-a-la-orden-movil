import { Alert, Button, StyleSheet, Text } from 'react-native';

import api from '@/api/api';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import { TextInput } from 'react-native';

import keys from '@/api/claves';
import { router } from 'expo-router';

export default function ingresar() {
  const [usuario, setUsuario] = useState('');
  const [contasenia, setContasenia] = useState('');
  const [user, setUser] = useState();

  const [token, setToken] = useState<String | null | undefined>('');

  function Ingresar(){
    console.log(usuario, contasenia)
    api.ingresar(usuario, contasenia)
      .then(response => { 
        if(!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => { 
        console.log(data);
        await keys.addToken(data.token);
        await keys.addUser(JSON.stringify(data.user));

        setUser(data.user);
        router.push('/dashboard');
      })
      .catch(err => { 
        Alert.alert('Error', 'El usuario o contraseña no son correctos.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }

  async function ObtnerToken(){
    let token = await keys.getToken();
    console.log(token);
    setToken(token);
  }

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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  parrafo:{
    color: "white"
  },
  input:{
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    color: "white"
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
