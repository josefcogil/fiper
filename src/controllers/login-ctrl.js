module.exports = {
    validateUser: (req, res) => {
        let users = require('../store/users.json');

        let user = users.find(user => user.email == req.body.email);

        let err = false;
        let msg = "";

        if (!user) { err = true; msg = "Email not registered" }

        if (err) {
            res.status(400).json({ msg, ok: false });
            return;
        }

        let password = user.password;

        if (password === req.body.password) {
            res.status(200).json({ msg: "Success", ok: true })
            return;
        } else {
            err = true; 
            msg = "Invalid password";
            res.status(400).json({ msg, ok: false });
            return;
        }

    }
}