const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../store/users.json');

module.exports = {

    addUser: async (req, res) => {
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

        switch (req.body.role) {
            case "recruiter":

                let newRecruiter = {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                }

                users.push(newRecruiter);

                fs.writeFile(filePath, JSON.stringify(users), (err) => {
                    if (err) throw err;

                    res.status(201).json({ msg: "User registered", ok: true });
                })
                break;

            case "developer":

                if (!req.body.tecnologies) { err = true; msg = "Please enter your tecnologies"; }

                if (err) {
                    res.status(400).json({ msg, ok: false });
                    return;
                }

                let newDeveloper = {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    role: req.body.role,
                    password: req.body.password,
                    tecnologies: req.body.tecnologies
                }

                users.push(newDeveloper);

                fs.writeFile(filePath, JSON.stringify(users), (err) => {
                    if (err) throw err;

                    res.status(201).json({ msg: "User registered", ok: true });
                })
                break;
        }
    }
}