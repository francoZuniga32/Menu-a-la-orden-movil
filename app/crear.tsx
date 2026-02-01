import api from "@/api/api";
import keys from "@/api/claves";
import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "@/styles/css";

import media from '@/api/media';
import { ImagePickerAsset } from "expo-image-picker";

export default function CrearMenu() {


    const [valor, setValor] = useState("template1");
    const [nombre, setNombre] = useState("");
    const [items, setItems] = useState<IItem[]>([]);

    const [tituloItem, setTituloItem] = useState("");
    const [precioItem, setPrecioItem] = useState("");
    const [descripcion, setDescripcionItem] = useState("");

    const [user, setUser] = useState<IUsuario>();

    const [image, setImage] = useState<ImagePickerAsset>();
    const [fotos, setFotos] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            let user: any = await keys.getUser();
            user = JSON.parse(user);
            setUser(user);
        })();
    }, []);

    const agregarItem = async () => {
        let item: IItem = {
            id: 0,
            titulo: tituloItem,
            precio: parseInt(precioItem),
            descripcion: descripcion,
            foto: null,
            idMenu: null
        }
        let mensajeValidacion = validarCargaItem();
        if (mensajeValidacion == "") {
            setItems(prev => [...prev, item]);
            //guardamos la imagen
            let imagen = image? image : {uri: ""};
            setFotos(prev => [...prev, imagen]);
            console.log(imagen, fotos);
        } else {
            Alert.alert("Error al cargar el item", mensajeValidacion, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }

    const eliminarItem = (i: number) => {
        let itemsEliminado = [...items];
        itemsEliminado.splice(i, 1);
        setItems(itemsEliminado);

        let fotosEliminado = [...fotos];
        fotosEliminado.splice(i, 1);
        setFotos(fotosEliminado);
    }

    const crearMenu = async () => {
        let usuario = await keys.getUser();

        let mensajeValidacion = validarCargaMenu();
        if (mensajeValidacion == "") {
            let menuCrear: IMenu = {
                id: null,
                nombre: nombre,
                template: valor,
                idUsuario: user ? user.id : 0
            };

            let responseMenu = await api.crearMenu(menuCrear);
            if (responseMenu.ok) {
                let dataMenu = await responseMenu.json();
                console.log("menu creado:" + dataMenu);
                //cargamos los items
                items.forEach(x => {
                    x.idMenu = dataMenu.id
                });

                //cargamos las imagenes
                console.log(fotos);
                for (let i = 0; i < fotos.length; i++) {
                    let foto = fotos[i];
                    let responseFoto = await api.uploadFile(foto);
                    console.log(responseFoto);
                    items[i].foto = responseFoto.filename;
                }

                let responseItems = await api.crearItem(items);
                if (responseItems.ok) {
                    router.push("/dashboard");
                } else {
                    Alert.alert("Error", "No se pudieron cargar los items", [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            } else {
                Alert.alert("Error", "No se pudo cargar el menu", [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } else {
            Alert.alert("Error al cargar el menu.", mensajeValidacion, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }

    const loadFile = async () => {
        let foto = await media.pickFile();
        console.log(foto);
        if (foto) {
            setImage(foto);
            //await api.uploadFile(foto);
        }
    }

    const validarCargaItem = () => {
        var mensaje = "";
        if (tituloItem == "") mensaje += "tiene que cargar el titulo de un item. \n";
        if (precioItem == "") mensaje += "tiene que cargar el precio de un item. \n";
        if (descripcion == "") mensaje += "tiene una descripcion para el item. \n";
        return mensaje;
    }

    const validarCargaMenu = () => {
        var mensaje = "";
        if (nombre == "") mensaje += "tiene que cargar un nombre al menu.\n";
        if (items.length == 0) mensaje += "tiene que agregar items al menu.\n";
        return mensaje;
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
            width: "80%",
            display: "flex",
            flexDirection: "row"
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
                <Text style={styles.title}>Agregar Item</Text>
                <View>
                    <Text style={styles.parrafo}>Titulo Item</Text>
                    <TextInput style={styles.input} onChangeText={setTituloItem}></TextInput>
                    <Text style={styles.parrafo}>Precio Item</Text>
                    <TextInput style={styles.input} onChangeText={setPrecioItem} keyboardType='number-pad'></TextInput>
                    <Text style={styles.parrafo}>Descripcion</Text>
                    <TextInput style={styles.input} onChangeText={setDescripcionItem}></TextInput>
                    <View style={{ display: "flex", flexDirection: "row", marginTop: 20, height: "auto", minHeight: 100 }}>
                        <View style={{ width: "90%" }}>
                            <Image
                                style={{ width: "auto", height: "auto", minHeight: 100 }}
                                source={{ uri: image?.uri }}
                            />
                        </View>
                        <TouchableOpacity onPress={loadFile} style={styles.button_image}>
                            <Image source={require('@/assets/images/add_photo.png')} style={{ width: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <Button title="Agregar Item" onPress={agregarItem}></Button>
                </View>
            </View>
            <View>
                {
                    items.map((i, k) => (
                        <View style={css.card} key={k}>
                            <View style={css.col_10}>
                                <View>
                                    <Image source={{ uri: fotos[k].uri }} style={{ width: 30, height: 30 }}>
                                    </Image>
                                </View>
                                <View>
                                    <Text style={styles.parrafo}>{i.titulo}</Text>
                                    <Text style={styles.parrafo}>$. {i.precio}</Text>
                                    <Text style={styles.parrafo}>{i.descripcion}</Text>
                                </View>
                            </View>
                            <View>
                                <Button title='x' color="red" onPress={() => eliminarItem(k)}>

                                </Button>
                            </View>
                        </View>
                    ))
                }
            </View>
            <View style={{ marginBottom: 10 }}>
                <Button title="Crear Menu" onPress={crearMenu}></Button>
            </View>
        </View>
    )
}
