interface userData{
    name: string,
    contact: string
}

const form = document.getElementById('userForm') as HTMLFormElement;

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;

    const newData: userData = {name, contact};

    const data = getData();
    data.push(newData);
    saveData(data);

    displayData();
    form.reset();

});


function displayData(){
    const container = document.getElementById('listUser')!;
    const data = getData();
    container.innerHTML = '';

    data.forEach((item: { name: any; contact: any; })=> {
        const entry = document.createElement('tr')
        entry.innerHTML = `
            <td>${item.name}</td>
            <td>${item.contact}</td>
            <button onclick="editEntry(${item.contact})">Edit</button>
            <button onclick="deleteEntry('${item.contact}')">Delete</button>
        `
        container.appendChild(entry);
    })
}

window.addEventListener("DOMContentLoaded", displayData);
function deleteEntry(contact: string) {
  const data = getData().filter((item: { contact: string; }) => item.contact !== contact);
  saveData(data);
  displayData();
}

function getData(): userData[] {
  return JSON.parse(localStorage.getItem("formDataList") || "[]");
}

function saveData(data: userData[]) {
  localStorage.setItem("formDataList", JSON.stringify(data));
}

function editEntry(contact: string) {
  const data = getData();
  const entry = data.find((item) => item.contact === contact);
  if (!entry) return;

  // Prefill form
  (document.getElementById('name') as HTMLInputElement).value = entry.name;
  (document.getElementById('contact') as HTMLInputElement).value = entry.contact;

  // Delete the old entry so it can be "re-added" after editing
  const updatedData = data.filter((item) => item.contact !== contact);
  saveData(updatedData);
  displayData();
}
