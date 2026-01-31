import api from "@/api/api";
import keys from "@/api/claves";
import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import media from "@/api/media";
import styles from "@/styles/css";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";

export default function CrearMenu() {
    let { id } = useLocalSearchParams<{ id: string }>();

    const [valor, setValor] = useState("java");
    const [nombre, setNombre] = useState("");
    const [items, setItems] = useState<IItem[]>([]);

    const [tituloItem, setTituloItem] = useState("");
    const [precioItem, setPrecioItem] = useState("");
    const [descripcion, setDescripcionItem] = useState("");

    const [itemsNuevos, setItemsNuevos] = useState<IItem[]>([]);
    const [itemsEliminar, setItemsEliminar] = useState<IItem[]>([]);

    const [user, setUser] = useState<IUsuario>();

    const [image, setImage] = useState<ImagePickerAsset>();
    const [fotos, setFotos] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            let user: any = await keys.getUser();
            user = JSON.parse(user);
            setUser(user);
            inicializarMenu();
        })();
    }, []);

    const inicializarMenu = () => {
        api.getMenu(parseInt(id))
            .then(result => result.json())
            .then(data => {
                console.log(data);
                setNombre(data.nombre);
                setValor(data.template);
                setItems(data.items);
            });
    }

    const agregarItem = () => {
        let item: IItem = {
            id: 0,
            titulo: tituloItem,
            precio: parseInt(precioItem),
            descripcion: descripcion,
            foto: null,
            idMenu: parseInt(id)
        }

        setItemsNuevos(prev => [...prev, item]);
        //guardamos la imagen
        setFotos(prev => [...prev, image]);
        console.log(image, fotos);
    }

    const eliminarItem = (i: number) => {
        let itemsEliminado = [...items];
        //agregamos el nuevo item eliminado a la lista
        setItemsEliminar(prev => [...prev, items[i]]);
        //eliminamos el item de la vista
        itemsEliminado.splice(i, 1);
        setItems(itemsEliminado);
        console.log(itemsEliminado)
    }


    const eliminarItemNuevo = (i: number) => {
        let itemsEliminado = [...itemsNuevos];
        //eliminamos el item de la vista
        itemsEliminado.splice(i, 1);
        setItems(itemsEliminado);

        let fotosEliminado = [...fotos];
        fotosEliminado.splice(i, 1);
        setFotos(fotosEliminado);
    }

    const loadFile = async () => {
        let foto = await media.pickFile();
        console.log(foto);
        if (foto) {
            setImage(foto);
            //await api.uploadFile(foto);
        }
    }

    const editarMenu = async () => {
        let usuario = await keys.getUser();
        let menuCrear: IMenu = {
            id: parseInt(id),
            nombre: nombre,
            template: valor,
            idUsuario: user ? user.id : 0
        };

        let responseMenuEdit = await api.editarMenu(menuCrear);
        if (responseMenuEdit.ok) {
            let control = true;
            if (itemsNuevos.length > 0) {
                itemsNuevos.forEach(x => {
                    x.idMenu = parseInt(id)
                });

                for (let i = 0; i < fotos.length; i++) {
                    let foto = fotos[i];
                    let responseFoto = await api.uploadFile(foto);
                    console.log(responseFoto);
                    itemsNuevos[i].foto = responseFoto.filename;
                }

                let responseItemsNuevos = await api.crearItem(itemsNuevos);
                console.log(responseItemsNuevos);
                control = control && responseItemsNuevos.ok;
            }

            if (itemsEliminar.length > 0) {

                let responseItemsEliminar = await api.eliminarItem(itemsEliminar);
                console.log({ items: itemsEliminar, respuesta: responseItemsEliminar });
                control = control && responseItemsEliminar.ok;
            }

            if (control) router.push("/dashboard");
            else Alert.alert('Error', "Error al tratar de eliminar o agregar items al menu", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            Alert.alert('Error', "Error al tratar de editar el menu", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
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
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre}></TextInput>
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
                                <View>
                                    <Image source={{ uri: api.baseUrl + '/' + i.foto }} style={{ width: 30, height: 30 }}>
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

                {
                    itemsNuevos.map((i, k) => (
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
                                <Button title='x' color="red" onPress={() => eliminarItemNuevo(k)}>

                                </Button>
                            </View>
                        </View>
                    ))
                }
            </View>
            <View>
                <Button title="Crear Menu" onPress={editarMenu}></Button>
            </View>
        </View>
    )
}

