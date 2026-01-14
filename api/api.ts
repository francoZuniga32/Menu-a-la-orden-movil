const baseUrl : string = "http://192.168.100.9:3001";

export default {
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
    
    getMenus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(baseUrl + "/menus", requestOptions);
    },

    getMenu(id:string){
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
    }
};