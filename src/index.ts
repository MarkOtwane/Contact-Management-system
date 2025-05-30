import * as readline from 'readline';

const allowInput = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

interface FormData {
    name: string;
    userContact: string;
}

let task: FormData[] = JSON.parse(localStorage.getItem("") || "[]");
// array to hold user data 
// get user from html
const form = document.getElementById('form') as HTMLFormElement;
const tableData = document.querySelector("#details, tbody") as HTMLSelectElement;

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name') as HTMLInputElement;
    const userContact = document.getElementById('contact') as HTMLInputElement;
    const button = document.querySelector('.add') as HTMLElement;

    // object
    const formData: FormData = {
        name: name.value,
        userContact: userContact.value
    }
    task.push(formData);

    form.reset();
});
// Removed invalid forEach usage; use the correct forEach below for rendering table rows.
// place to enter the user then button to add 
tableData.innerHTML = ''
    // array.foreach(element =>{});
        task.forEach(formData => {
            const formdetails = document.createElement("tr");
            formdetails.innerHTML = `
                <td>${formData.name}</td>
                <td>${formData.userContact}</td>
                <td><button class="edit-btn">Edit</button></td>
                <td><button class="remove-btn">Edit</button></td>
            `
            
        });

// create a function that allows user input 