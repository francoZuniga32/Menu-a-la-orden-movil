import { BACKEND_URL } from "@/constants/config";
import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";
import axios from "axios";

export default {
    baseUrl : BACKEND_URL,

    login(usuario:string, contrasenia:string){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": usuario,
            "password": contrasenia
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        return fetch(this.baseUrl + "/usuario/login", requestOptions);
    },

    registrarUsuario(usaurio : IUsuario){
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(usaurio);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        return fetch(this.baseUrl + "/usuario/", requestOptions);
    },
    
    getMenus(){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(process.env.BACKEND);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(this.baseUrl + "/menus", requestOptions);
    },

    getMenu(id:number|null){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(this.baseUrl + "/menus/"+id, requestOptions);
    },

    ingresar(usuario:string, contrasenia: string){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                username: usuario,
                password: contrasenia
            })
        };
        return fetch(this.baseUrl + "/usuario/login", requestOptions);
    },

    menusUsuario(idUsuario:number){
        let headers = {"Content-Type": "application/json"};

        return axios({
            method: 'get',
            url: this.baseUrl + "/menus/usuario/"+idUsuario,
            headers: headers
        });
    },

    crearMenu(menu: IMenu){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };

        return fetch(this.baseUrl + "/menus/", requestOptions);

    },
    editarMenu(menu: IMenu){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };
        return fetch(this.baseUrl + "/menus/"+menu.id, requestOptions);
    },
    crearItem(item: IItem[]){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({items: item})
        };

        return fetch(this.baseUrl + "/menus/items/", requestOptions);
    },
    eliminarMenu(id: number){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        };

        return fetch(this.baseUrl + "/menus/"+id, requestOptions);
    },
    eliminarItem( items:IItem[] ){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = { 
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
                items: items
            })
        };

        return fetch(this.baseUrl + "/menus/items", requestOptions);
    },
    uploadFile: async (file : any)=>{
        const formData = new FormData();
        
        formData.append("miniatura", {
            uri: file.uri,
            name: file.fileName ?? "archivo.jpg",
            type: file.mimeType ?? "image/jpeg",
        } as any);

        const response = await fetch(this.baseUrl+"/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        return await response.json();
    }

};