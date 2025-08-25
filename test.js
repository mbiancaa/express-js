const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("This is a middleware");
    next();
})
app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})


app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1>')
})

app.get('/contact/:id', (req, res) => {
    res.send(`<h1>Contact Us for Parameter ${req.params.id}</h1>`);
})

// app.get('/contacts?skip=0&limit=10', (req, res) => {
//     const params = req.query;

/**
 * 
 * {
 * skip: 0,
 * limit: 10
 * }
 */
// res.send(`<h1>Contact Us for Parameter ${req.params.id}</h1>`);
// })

// Content-Type: application/x-www-form-urlencoded -> header pentru cerere POST din formular

// app.use(express.urlencoded({ extended: false }))

app.post('/login', (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
})

app.get('/login-page', (req, res) => {
    res.send('<form action="/login" method="POST"><label for="email">Email</label><input type="text" name="email" id="email"/><label for="password">Password</label><input type="password" name="password" id="password"/><button type="submit">Log in</button></form>')
})


app.use(express.json())

