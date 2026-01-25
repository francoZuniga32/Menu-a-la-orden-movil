import api from "@/api/api";
import keys from "@/api/claves";
import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CrearMenu() {


    const [valor, setValor] = useState("java");
    const [nombre, setNombre] = useState("");
    const [items, setItems] = useState<IItem[]>([]);

    const [tituloItem, setTituloItem] = useState("");
    const [precioItem, setPrecioItem] = useState("");
    const [descripcion, setDescripcionItem] = useState("");

    const [user, setUser] = useState<IUsuario>();

    useEffect(() => {
        (async () => {
            let user: any = await keys.getUser();
            user = JSON.parse(user);
            setUser(user);
        })();
    }, []);

    const agregarItem = () => {
        let item: IItem = {
            id: 0,
            titulo: tituloItem,
            precio: parseInt(precioItem),
            descripcion: descripcion,
            foto: "",
            idMenu: null
        }

        setItems(prev => [...prev, item]);

    }

    const eliminarItem = (i: number) => {
        let itemsEliminado = [...items];
        itemsEliminado.splice(i, 1);
        setItems(itemsEliminado);
    }

    const crearMenu = async () => {
        let usuario = await keys.getUser();
            let menuCrear: IMenu = {
                id: null,
                nombre: nombre,
                template: valor,
                idUsuario: user? user.id : 0
            };

            api.crearMenu(menuCrear)
            .then(result => result.json())
            .then( data => {
                console.log("menu creado:" +data);
                //cargamos los items
                items.forEach( x => {
                    x.foto = "",
                    x.idMenu = data.id
                });

                api.crearItem(items)
                .then(result =>{
                    console.log(result);
                    return result.json();
                })
                .then(data => router.push("/dashboard"))
                .catch(err => console.error(err));
            });
    }

    let css = StyleSheet.create({
        card: {
            borderColor: "#fff",
            borderRadius: 2,
            borderWidth: 1,
            margin: 2,
            padding: 5,
            display: "flex",
            flexDirection: "row"
        },
        col_10: {
            width: "90%"
        }
    })

    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.parrafo}>Nombre</Text>
                <TextInput style={styles.input} onChangeText={setNombre}></TextInput>
            </View>
            <View>
                <Text style={styles.parrafo}>Template</Text>
                <View style={styles.input}>
                    <Picker
                        style={{ color: "white" }}
                        selectedValue={valor}
                        onValueChange={(itemValue) => setValor(itemValue)}
                    >
                        <Picker.Item label="template 1" value="template1" />
                        <Picker.Item label="template 2" value="template2" />
                        <Picker.Item label="template 3" value="template3" />
                    </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.titulo}>Agregar Item</Text>
                <View>
                    <Text style={styles.parrafo}>Titulo Item</Text>
                    <TextInput style={styles.input} onChangeText={setTituloItem}></TextInput>
                    <Text style={styles.parrafo}>Precio Item</Text>
                    <TextInput style={styles.input} onChangeText={setPrecioItem} keyboardType='number-pad'></TextInput>
                    <Text style={styles.parrafo}>Descripcion</Text>
                    <TextInput style={styles.input} onChangeText={setDescripcionItem}></TextInput>
                    <View style={styles.button}>
                        <Button title='Agregar Item' onPress={agregarItem}></Button>
                    </View>
                </View>
            </View>
            <View>
                {
                    items.map((i, k) => (
                        <View style={css.card} key={k}>
                            <View style={css.col_10}>
                                <Text style={styles.parrafo}>{i.titulo}</Text>
                                <Text style={styles.parrafo}>$. {i.precio}</Text>
                                <Text style={styles.parrafo}>{i.descripcion}</Text>
                            </View>
                            <View>
                                <Button title='x' color="red" onPress={() => eliminarItem(k)}>

                                </Button>
                            </View>
                        </View>
                    ))
                }
            </View>
            <View>
                <Button title="Crear Menu" onPress={crearMenu}></Button>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    body: {
        margin: 2,

    },
    titulo: {
        color: "white",
        fontSize: 25
    },
    parrafo: {
        color: "white"
    },
    input: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 2,
        color: "white"
    },
    button: {
        marginTop: 20
    }
})
