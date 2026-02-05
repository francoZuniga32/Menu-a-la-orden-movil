import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";
import axios from "axios";

const baseUrl : string = "http://192.168.0.63:3001";

export default {
    baseUrl: "http://192.168.0.63:3001",
    login(usuario:string, contrasenia:string){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": usuario,
            "password": contrasenia
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        return fetch(baseUrl + "/usuario/login", requestOptions);
    },

    registrarUsuario(usaurio : IUsuario){
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(usaurio);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        return fetch(baseUrl + "/usuario/", requestOptions);
    },
    
    getMenus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(baseUrl + "/menus", requestOptions);
    },

    getMenu(id:number|null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(baseUrl + "/menus/"+id, requestOptions);
    },

    ingresar(usuario:string, contrasenia: string){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                username: usuario,
                password: contrasenia
            })
        };
        return fetch(baseUrl + "/usuario/login", requestOptions);
    },

    menusUsuario(idUsuario:number){
        let headers = {"Content-Type": "application/json"};

        return axios({
            method: 'get',
            url: baseUrl + "/menus/usuario/"+idUsuario,
            headers: headers
        });
    },

    crearMenu(menu: IMenu){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };

        return fetch(baseUrl + "/menus/", requestOptions);

    },
    editarMenu(menu: IMenu){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };
        console.log(menu);
        return fetch(baseUrl + "/menus/"+menu.id, requestOptions);
    },
    crearItem(item: IItem[]){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({items: item})
        };

        return fetch(baseUrl + "/menus/items/", requestOptions);
    },
    eliminarMenu(id: number){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        };

        return fetch(baseUrl + "/menus/"+id, requestOptions);
    },
    eliminarItem( items:IItem[] ){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = { 
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
                items: items
            })
        };

        return fetch(baseUrl + "/menus/items", requestOptions);
    },
    uploadFile: async (file : any)=>{
        const formData = new FormData();

        formData.append("miniatura", {
            uri: file.uri,
            name: file.fileName ?? "archivo.jpg",
            type: file.mimeType ?? "image/jpeg",
        } as any);

        const response = await fetch(baseUrl+"/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        return await response.json();
    }

};