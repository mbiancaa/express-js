const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

app.listen(3000, () => {
    console.log("Server running on localhost:3000");
})