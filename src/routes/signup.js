const express = require('express');
const router = express.Router();

const controller = require('../controllers/signup-ctrl');

router.get('/', (req, res) => res.render('signup'));

router.post('/', controller.addUser);

module.exports = router;