const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const usersPath = path.join(__dirname, 'users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

app.post('/login', (req, res) => {
    console.log(req.body)
    const { user, password } = req.body;

    let foundUser = false;

    for (let i = 0; i < users.length()-1 ; i++){
        if (user==users[i].user && password===users[i].password){
            foundUser = true;
        }
    }

    if (foundUser) {
        return res.send('Login successful.');
    }

    return res.status(401).send('Invalid username or password.');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});