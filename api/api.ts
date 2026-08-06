import IItem from "@/models/IItem";
import IMenu from "@/models/IMenu";
import IUsuario from "@/models/IUsuario";

export default class Api {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";
    }

    registrarUsuario(usuario : IUsuario){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(usuario);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        return fetch(this.baseUrl + "/usuario/", requestOptions);
    }
    
    getMenus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        console.log(this.baseUrl + "/menus");
        return fetch(this.baseUrl + "/menus", requestOptions);
    }

    getMenu(id:number|null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(this.baseUrl + "/menus/"+id, requestOptions);
    }

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
        return fetch(this.baseUrl + "/usuario/login", requestOptions);
    }

    menusUsuario(idUsuario:number){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        return fetch(this.baseUrl + "/menus/usuario/"+idUsuario, requestOptions);
    }

    crearMenu(menu: IMenu, token: string | null | undefined ){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer "+(token ? token : ""));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };

        return fetch(this.baseUrl + "/menus/", requestOptions);

    }
    editarMenu(menu: IMenu, token: string | null | undefined){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer "+(token ? token : ""));

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(menu)
        };
        return fetch(this.baseUrl + "/menus/"+menu.id, requestOptions);
    }
    crearItem(item: IItem[], token: string | null | undefined){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer "+(token ? token : ""));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({items: item})
        };

        return fetch(this.baseUrl + "/menus/items/", requestOptions);
    }
    eliminarMenu(id: number, token: string | null | undefined){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer "+(token ? token : ""));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        };

        return fetch(this.baseUrl + "/menus/"+id, requestOptions);
    }
    eliminarItem( items:IItem[], token : string | null | undefined ){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer "+(token ? token : ""));

        var requestOptions = { 
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
                items: items
            })
        };

        return fetch(this.baseUrl + "/menus/items", requestOptions);
    }
    
    async uploadFile(file : any){
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