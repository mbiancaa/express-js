const contactsList = document.getElementById("contactsList");
const addForm = document.getElementById("addForm");

function loadContacts() {
    fetch('/contacts')
        .then(res => res.json())
        .then(data => {
            contactsList.innerHTML = '';
            data.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.id} - ${contact.name} (${contact.phone})`;

                const editBtn = document.createElement('button');
                editBtn.textContent = "Edit";
                editBtn.onclick = () => {
                    editContact(contact);
                };
                li.appendChild(editBtn);

                const delBtn = document.createElement('button');
                delBtn.textContent = "Delete";
                delBtn.onclick = () => {
                    deleteContact(contact.id);
                }
                li.appendChild(delBtn);


                contactsList.appendChild(li);
            });
        }
        )
}

function deleteContact(id) {
    fetch(`/contacts/${id}`, { method: 'DELETE' }).then(() => loadContacts());
}

function editContact(contact) {
    const newName = prompt("Name:", contact.name);
    const newPhone = prompt("Phone", contact.phone);
    if (newName && newPhone) {
        fetch(`/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, phone: newPhone })
        }).then(() => loadContacts())
    }
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
    }).then(() => {
        addForm.reset();
        loadContacts();
    })
})


window.addEventListener('DOMContentLoaded', loadContacts);