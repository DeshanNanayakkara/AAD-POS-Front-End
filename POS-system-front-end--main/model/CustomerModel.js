import { customers } from '../database/db.js'


export function getAll(){
    return new Promise ((resolve, reject) => {
        let customers = [];
        const http = new XMLHttpRequest();
    
        http.onreadystatechange = () => {
        if (http.readyState == 4) {
            if (http.status == 200) {
                customers = JSON.parse(http.responseText);
                console.log(customers);
                resolve(customers);
            } else {
                reject('Request failed with status:', http.status);
            }
        }
        // return customer;
        }
    
        http.open("GET", `http://localhost:8080/pos/customer?type=${'all'}`, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send();
    })
}


export function save(customerJSON){
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        
        http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){
                console.log('Hello');
                resolve(true);
            }else{
                reject(false);
                console.log('Request failed with status:', http.status);
            }
        }else{

        }
    };

    http.open("POST", "http://localhost:8080/pos/customer", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(customerJSON);
    }) 
    
}

export function remove(customerId){
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){

            }else{

            }
        }else{

        }
    };

    http.open("DELETE", `http://localhost:8080/pos/customer?id=${customerId}`, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}


export function search(id) {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    const customer = JSON.parse(http.responseText);
                    resolve(customer);
                } else {
                    reject(`Request failed with status: ${http.status}`);
                }
            }
        };

        http.open("GET", `http://localhost:8080/pos/customer?id=${id}&type=${'one'}`, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send();
    });
}


export function update(cusId, customerJSON){
    const http = new XMLHttpRequest();
        
    http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){
                console.log('Hello');
                return true;
            }else{
                console.log('Request failed with status:', http.status);
            }
        }else{

        }
    };

    http.open("PUT", `http://localhost:8080/pos/customer?id=${cusId}`, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(customerJSON);
}


