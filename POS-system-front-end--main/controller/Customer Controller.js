import { getAll, remove, save, search, update } from '../model/CustomerModel.js';
import { loadDataIntoCustomerField } from '../controller/OrderController.js';
import { customers } from '../database/db.js';


clearTable();
loadAllCustomers();
nextCustomerId();
getAll();
export { saveCustomer, deleteCustomer, updateCustomer, clearFields };


function loadAllCustomers() {
    // nextCustomerId();
    getAll().then((customers) => {
        reloadTable(customers);
    })
   
}

function reloadTable(customers){
    let tableBody = document.getElementById('customer-table-body');
    let customer = [];
                
                for(let i=0; i<customers.length; i++){
                    customer = customers[i];
                    let newRow = tableBody.insertRow();

                    let cell1 = newRow.insertCell(0);
                    let cell2 = newRow.insertCell(1);
                    let cell3 = newRow.insertCell(2);
                    let cell4 = newRow.insertCell(3);

                    cell1.textContent = customer.id;
                    cell2.textContent = customer.name;
                    cell3.textContent = customer.address;
                    cell4.textContent = customer.salary;
                }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Awa");
    const table = document.getElementById('customer-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener('click', function () {
            const cells = this.getElementsByTagName('td');
            document.getElementById('CustomerId').value = cells[0].innerText;
            document.getElementById('CustomerName').value = cells[1].innerText;
            document.getElementById('CustomerAddress').value = cells[2].innerText;
            document.getElementById('CustomerSalary').value = cells[3].innerText;
        });
    }
});


// function getAllCustomers(){
//     let customers = getAll();
//     customers.forEach(customer => {
//         reloadTable(customer);
//     });
// }

// function reloadTable(customer) {
//     let tableBody = document.getElementById('customer-table-body');
//     let newRow = tableBody.insertRow();

//     let cell1 = newRow.insertCell(0);
//     let cell2 = newRow.insertCell(1);
//     let cell3 = newRow.insertCell(2);
//     let cell4 = newRow.insertCell(3);

//     cell1.textContent = customer.cusId;
//     cell2.textContent = customer.cusName;
//     cell3.textContent = customer.cusAddress;
//     cell4.textContent = customer.cusSalary;
// }

function saveCustomer() {
    let id = document.getElementById('CustomerId').value;
    let name = document.getElementById('CustomerName').value;
    let address = document.getElementById('CustomerAddress').value;
    let salary = document.getElementById('CustomerSalary').value;
    
    if(validate(name,address,salary)){
        let customerObj = {
            id: id,
            name: name,
            address: address,
            salary: salary
        };

        console.log(customerObj);
    
        const customerJSON = JSON.stringify(customerObj);

        save(customerJSON).then(() => {
            clearTable();
            clearFields();
            loadAllCustomers(); 
            nextCustomerId();
        })
        
        
    }

    
}

function validate(name, address, salary){
    let nameField = document.getElementById('CustomerName');
    let addressField = document.getElementById('CustomerAddress');
    let salaryField = document.getElementById('CustomerSalary');

    let nameValid = false;

    if(name === ''){
        nameField.placeholder = 'Customer Name can not be empty!';
        nameField.style.width = '350px';
        nameField.style.border = '2px solid red';
        nameValid = false;
    }else if(/^[a-zA-Z\s]+$/.test(name)){
        nameValid = true;
    }else{
        nameField.placeholder = 'Name Invalid!';
        nameField.style.border = '2px solid red';
        nameValid = false;
    }

    let addressValid = false;

    if(address === ''){
        addressField.placeholder = 'Address can not be empty!';
        addressField.style.border = '2px solid red';
        addressValid  = false;
    }else if(/^[a-zA-Z0-9\s,'-]+$/.test(address)){
        addressValid = true;
    }else{
        addressField.placeholder = 'Address Invalid!';
        addressField.style.border = '2px solid red';        
        addressValid = false;
    }

    let salaryValid = false;

    if(salary === ''){
        salaryField.placeholder = 'Salary can not be empty!';
        salaryField.style.width = '270px';
        salaryField.style.border = '2px solid red';
        salaryValid  = false;
    }else if(/^\d+(\.\d{1,2})?$/.test(salary)){
        salaryValid = true;
    }else{
        salaryField.placeholder = 'Salary Invalid!';
        salaryField.style.border = '2px solid red';
        salaryValid = false;
    }

    if(nameValid === true && addressValid === true && salaryValid === true){
        return true;
    }else{
        return false;
    }
}

function clearFields(){
    document.getElementById('CustomerId').value = "";
    document.getElementById('CustomerName').value = "";
    document.getElementById('CustomerAddress').value = "";
    document.getElementById('CustomerSalary').value = "";
}

function clearTable() {
    let tableBody = document.getElementById('customer-table-body');
    tableBody.innerHTML = "";
}

function deleteCustomer() {
    let cusId = document.getElementById('CustomerId').value;
    let customers = getAllCustomers();

    const customerId = document.getElementById("CustomerId").value;
    remove(customerId);
    clearTable();
    loadAllCustomers();
    
}

// function searchCustomer(){
//     let cusId = document.getElementById('CustomerId').value;
//     let customers = getAll();
//     let searchedCustomer = null;
    
//     for (let i = 0; i < customers.length; i++) {
//         if (cusId === customers[i].cusId) {
//             console.log('juhasud')
//             searchedCustomer = search(i);
//             // break;
//         }
//     }

//     if(searchedCustomer === null){
//         alert('There is no Customer on that ID!');
//     }else{

//         document.getElementById('CustomerName').value = searchedCustomer.cusName;
//         document.getElementById('CustomerAddress').value = searchedCustomer.cusAddress;
//         document.getElementById('CustomerSalary').value = searchedCustomer.cusSalary;
//     }
    
// }

function nextCustomerId(){
    getAll().then((customers) => {
        document.getElementById('CustomerId').value = (genarateCustomerID(customers[customers.length-1].id.toString()));
    })

    // let customers = getAll();
    // document.getElementById('CustomerId').value = genarateCustomerID(customers[customers.length-1].id).toString();
}

function genarateCustomerID(cusId){
    let array = cusId.split('C');
    let nextCusId = parseInt(array[1], 10);
    if(nextCusId++ < 10){
        return 'C00'+ nextCusId;
    }else{
        return 'C0' + nextCusId;
    }

}



document.getElementById('CustomerId').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        const customerId = event.target.value;
        getCustomer(customerId);
    }
});

// function getCustomer(id){
//     let customer = search(id);
    
//     // Update the UI with customer details
//     document.getElementById('CustomerId').value = customer.cusId;
//     document.getElementById('CustomerName').value = customer.cusName;
//     document.getElementById('CustomerAddress').value = customer.address;
//     document.getElementById('CustomerSalary').value = customer.salary;
            
// }

function getCustomer(id) {
    search(id)
        .then((customer) => {
            // Update the UI with customer details
            document.getElementById('CustomerId').value = customer.id;
            document.getElementById('CustomerName').value = customer.name;
            document.getElementById('CustomerAddress').value = customer.address;
            document.getElementById('CustomerSalary').value = customer.salary;
        })
        .catch((error) => {
            console.error(error);
        });
}


function updateCustomer(){
    let cusId = document.getElementById('CustomerId').value;

    const customer = {
                        id : this.cusId,
                        name : document.getElementById('CustomerName').value,
                        address : document.getElementById('CustomerAddress').value,
                        salary : document.getElementById('CustomerSalary').value
                    };



        const customerJSON = JSON.stringify(customer);
        if(update(cusId, customerJSON)){;
            clearTable();
            loadAllCustomers();
        }
        

    // update(index, 
    //     {
    //         cusId : document.getElementById('CustomerId').value,
    //         cusName : document.getElementById('CustomerName').value,
    //         cusAddress : document.getElementById('CustomerAddress').value,
    //         cusSalary : document.getElementById('CustomerSalary').value
    //     }
    // );
    // clearFields();
    // clearTable();
    // loadAllCustomers();
}



