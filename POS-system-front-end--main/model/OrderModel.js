import { orders } from "../database/db.js";


export function getAllOrders(){
    return orders;
}

export function saveOrder(orderJson){
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        
        http.onreadystatechange = () => {
        if(http.readyState == 4){
            resolve(true);
            if(http.status == 201){
                console.log('Hello');
                
            }else{
                reject(false);
                console.log('Request failed with status:', http.status);
            }
        }else{

        }
    };

    http.open("POST", `http://localhost:8080/pos/placeorder?type=${'order'}`, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(orderJson);
    })
}