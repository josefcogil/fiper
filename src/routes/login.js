const express = require('express');
const router = express.Router();

const controller = require('../controllers/login-ctrl');

router.get('/', (req, res) => res.render('login'));

router.post('/', controller.validateUser);

module.exports = router;