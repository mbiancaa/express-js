const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/contact-manager', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/contacts.html'));
});

app.get('/todo-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/todos.html'));
});

app.listen(3000, () => {
    console.log("Server running on localhost:3000");
})