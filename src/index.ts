interface userData {
  name: string;
  contact: string;
}

const form = document.getElementById('userForm') as HTMLFormElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const contact = (document.getElementById('contact') as HTMLInputElement).value.trim();

  if (!name || !contact) return;

  const newData: userData = { name, contact };
  const data = getData();
  data.push(newData);
  saveData(data);
  displayData();
  form.reset();
});

function displayData() {
  const container = document.getElementById('listUser') as HTMLTableSectionElement;
  const data = getData();
  container.innerHTML = '';

  data.forEach((item) => {
    const entry = document.createElement('tr');
    entry.innerHTML = `
      <td>${item.name}</td>
      <td>${item.contact}</td>
      <td>
        <button onclick="editEntry('${item.contact}')">Edit</button>
        <button onclick="deleteEntry('${item.contact}')">Delete</button>
      </td>
    `;
    container.appendChild(entry);
  });
}

window.addEventListener('DOMContentLoaded', displayData);

function deleteEntry(contact: string) {
  const data = getData().filter((item) => item.contact !== contact);
  saveData(data);
  displayData();
}

window.deleteEntry = deleteEntry;

// @ts-ignore - Allow attaching function to global for inline event handling
window.editEntry = function editEntry(contact: string) {
  const data = getData();
  const entry = data.find((item) => item.contact === contact);
  if (!entry) return;

  // Prefill form
  (document.getElementById('name') as HTMLInputElement).value = entry.name;
  (document.getElementById('contact') as HTMLInputElement).value = entry.contact;

  // Remove the old entry before editing
  const updatedData = data.filter((item) => item.contact !== contact);
  saveData(updatedData);
  displayData();
};

function getData(): userData[] {
  try {
    return JSON.parse(localStorage.getItem('formDataList') || '[]');
  } catch {
    return [];
  }
}

function saveData(data: userData[]) {
  localStorage.setItem('formDataList', JSON.stringify(data));
}
