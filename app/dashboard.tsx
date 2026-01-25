import api from '@/api/api';
import keys from '@/api/claves';
import Menu from '@/components/menu_edit';
import IUsuario from '@/models/IUsuario';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Dashboard() {

    interface Menu {
        id: number,
        template: string | null,
        nombre: string
    }

    const [menus, setMenu] = useState<Menu[]>([]);
    const [token, setToken] = useState<String | null | undefined>('');
    const [user, setUser] = useState<IUsuario>();

    async function ObtnerToken() {
        let token = await keys.getToken();
        console.log(token);
        setToken(token);
    }


    useEffect(() => {
        (async()=>{
            let user: any = await keys.getUser();
            user = JSON.parse(user);
            setUser(user);
            console.log(user);
            api.menusUsuario(user.id)
                .then(result => {
                    console.log(result);
                    return result.data;
                })
                .then(data => {
                    setMenu(data);
                    console.log(data);
                })
                .catch(err => console.error(err));
        })();
    },[]);

    const CrearMenu = ()=>{
        router.push("/crear");
    }

    const eliminarMenu = (id: number | null)=>{
        if(id){
            api.getMenu(id)
            .then(result => result.json())
            .then(data => {
                api.eliminarMenu(data.id);
                api.eliminarItem(data.items);
                console.log(data);
                if(user) api.getMenu(user.id) ;
            })
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.flexRow}>
                <View style={styles.w100}>
                    <Button title="Crear Menu" onPress={CrearMenu}></Button>
                </View>
                <View style={styles.w100}>
                    <Button title=""></Button>
                </View>
            </View>
            <View>
                {
                    menus.map((m, i) => (
                        <Menu key={i} id={m.id} titulo={m.nombre} descripcion='descripcion' eliminarMenu={eliminarMenu}></Menu>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        margin: 20
    },
    flexRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    w100: {
        width: "50%",
        padding: 2
    }
})