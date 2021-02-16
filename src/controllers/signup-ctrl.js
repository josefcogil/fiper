const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../store/users.json');

module.exports = {

    addUser: (req, res) => {
        console.log('POST', req.body)
        
        let users = require('../store/users.json');

        let user = users.find(user => user.email == req.body.email);

        let err = false;
        let msg = "";

        if (!req.body.name) { err = true; msg = "Please enter your name"; }
        else if (!req.body.lastname) { err = true; msg = "Please enter your lastname"; }
        else if (!req.body.email) { err = true; msg = "Please enter your email"; }
        else if (!req.body.password) { err = true; msg = "Please enter a password"; }
        else if (!req.body.role) { err = true; msg = "Please select a role"; }
        else if (user) { err = true; msg = "Email registered with another account" };

        if (err) {
            res.status(400).json({ msg, ok: false });
            return;
        }

        let newUser = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users), (err) => {
            if (err) throw err;

            res.status(201).json({ msg: "Thank you for registering, you will be redirected to the home page. New features will be added soon!", ok: true });
        })
    }
}