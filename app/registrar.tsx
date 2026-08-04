import api from "@/api/api";
import IUsuario from "@/models/IUsuario";
import style from "@/styles/css";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";

export default function Registrar() {
    const [nombre, setNombre] = useState<string>();
    const [apellido, setApellido] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [verPass, setVerPass] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>();
    const [verConfirmPass, setVerConfirmPass] = useState<boolean>(false);

    const registrar = async ()=>{
        let mensaje = validar();
        if(mensaje == ""){
            try{
                let usuario : IUsuario = {
                    id: 0,
                    username: username ? username : "",
                    password: password ? password : "",
                    nombre: nombre ? nombre : "",
                    apellidos: apellido ? apellido : "",
                    email: email ? email : ""
                };
                let response = await api.registrarUsuario(usuario);
                if(response.ok){
                    let data = response.json();
                    router.push("/(tabs)/ingresar");
                }else{
                    Alert.alert("Error al cargar el menu.", "Error al registrar el usuario.", [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            }catch(err){

            }

        }else{
            Alert.alert("Error al cargar el menu.", mensaje, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }

    const validar = ()=>{
        let mensaje = "";

        if(!nombre){
            mensaje += "Tiene que ingresar un nombre.\n";
        }

        if(!apellido) mensaje += "Tiene que ingresar un apellido.\n";
        if(!email) mensaje += "Tiene que ingresar un email.\n";
        if(!username) mensaje += "Tiene que ingresar un nombre de usuario.\n";
        if(!password) mensaje += "Tiene que ingresar una contraseña.\n";
        if(!passwordConfirm) mensaje += "Tiene que confirmar la contraseña.\n";
        if(!validarConcidenciaPass()) mensaje += "Las contraseñas tiene que concidir.\n";
        if(!validarFuerzaPass()){
            mensaje += 
            "La contraseña tiene que:\n"+
            "- al menos 8 caracteres.\n"+
            "- al menos una minuscula.\n"+
            "- al menos una mayuscula.\n"+
            "- al menos un numero.\n"+
            "- al menos un caracter especial.\n";
        }

        return mensaje;
    }

    const validarConcidenciaPass = ()=>{
        if(password && passwordConfirm) return password == passwordConfirm;
        else return "";
    }
    
    const validarFuerzaPass = ()=>{
        //validamos que tenga algun numero
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(password) return passwordRegex.test(password);
        else return false;
    }


    return (
        <ScrollView contentContainerStyle={style.formBody} keyboardShouldPersistTaps="handled">
            <Text style={style.label}>Nombre/s</Text>
            <TextInput style={style.input} onChangeText={setNombre}></TextInput>
            <Text style={style.label}>Apellido/s</Text>
            <TextInput style={style.input} onChangeText={setApellido}></TextInput>
            <Text style={style.label}>Email</Text>
            <TextInput style={style.input} onChangeText={setEmail} keyboardType="email-address"></TextInput>
            <Text style={style.label}>Nombre de usuario</Text>
            <TextInput style={style.input} onChangeText={setUsername}></TextInput>
            <Text style={style.label}>Contraseña</Text>
            <TextInput style={style.input} onChangeText={setPassword} secureTextEntry={!verPass}></TextInput>
            <Text style={style.label}>Confirmar Contraseña</Text>
            <TextInput style={style.input} onChangeText={setPasswordConfirm} secureTextEntry={!verConfirmPass}></TextInput>
            <View style={style.button}>
                <Button title="Registrar" onPress={registrar}></Button>
            </View>
        </ScrollView>
    )
}