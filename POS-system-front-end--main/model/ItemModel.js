import { items  } from "../database/db.js";

export function getItem(itemCode){
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    const item = JSON.parse(http.responseText);
                    console.log('item', item);
                    resolve(item);
                } else {
                    reject(`Request failed with status: ${http.status}`);
                }
            }
        };

        http.open("GET", `http://localhost:8080/pos/item?itemCode=${itemCode}&type=${'one'}`, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send();
    });
}


export function getAllItems(){
    // return items;
    return new Promise ((resolve, reject) => {
        let items = [];
        const http = new XMLHttpRequest();
    
        http.onreadystatechange = () => {
        if (http.readyState == 4) {
            if (http.status == 200) {
                items = JSON.parse(http.responseText);
                console.log('items : ', items);
                resolve(items);
            } else {
                console.log('Request failed with status:', http.status);
            }
        }
        // return customer;
        }
    
        http.open("GET", `http://localhost:8080/pos/item?type=${'all'}`, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send();
    })
}

export function save(itemJSON){
    // items.push(Item);
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        
        http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){
                console.log('Hello');
                resolve(true);
            }else{
                resolve(false);
                console.log('Request failed with status:', http.status);
            }
        }else{

        }
    };

    http.open("POST", "http://localhost:8080/pos/item", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(itemJSON);
    })
}

export function remove(itemCode){
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){
                resolve(true);
            }else{

            }
        }else{

        }
    };

    http.open("DELETE", `http://localhost:8080/pos/item?itemCode=${itemCode}`, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    })
}


export function update(itemCode, itemJson){
    
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        
        http.onreadystatechange = () => {
            if(http.readyState == 4){
                resolve(true);
                if(http.status == 201){
                    
                    console.log('Hello');
                    
                }else{
                    reject('Request failed with status:', http.status);
                }
            }else{

            }
        };

        http.open("PUT", `http://localhost:8080/pos/item?itemCode=${itemCode}`, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(itemJson);
    })
}