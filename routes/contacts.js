const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const filePath = path.join(__dirname, '../data/contacts.json');

function readContacts() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data)
}

function writeContacts(contacts) {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');
}

// GET /contacts
router.get('/', (req, res) => {
    const contacts = readContacts();
    res.json(contacts);
})

// GET /contacts/:id
router.get('/:id', (req, res) => {
    const contacts = readContacts();
    const contactById = contacts.find(c => c.id == req.params.id);
    contactById ?
        res.json(contactById) :
        res.status(404).send('Contact not found');
})

// POST /contacts
router.post('/', (req, res) => {
    const contacts = readContacts();
    const newContact = {
        id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
        name: req.body.name,
        phone: req.body.phone
    };
    contacts.push(newContact);
    writeContacts(contacts);
    res.status(201).json(newContact);
});

// PUT /contacts/:id
router.put('/:id', (req, res) => {
    const contacts = readContacts();
    const contactById = contacts.find(c => c.id == req.params.id);
    if (!contactById) return res.status(404).send("Contact not found");

    contactById.name = req.body.name || contactById.name;
    contactById.phone = req.body.phone || contactById.phone;
    writeContacts(contacts);
    res.json(contactById);
})

// DELETE /contacts/:id
router.delete('/:id', (req, res) => {
    let contacts = readContacts();
    const initialLength = contacts.length;
    contacts = contacts.filter(c => c.id != req.params.id);
    if (contacts.length === initialLength) {
        return res.status(404).send("Contact not found")
    }

    writeContacts(contacts);
    res.send("Contact deleted");
})

module.exports = router;