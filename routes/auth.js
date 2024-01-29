const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title : 'API Tec - Login' });
});

router.get('/register', (req, res) => {
    res.render('register', { title : 'API Tec - Register' });
});

router.get('/component', (req, res) => {
    res.render('add_component', { title : 'API Tec - Add Component' });
});

module.exports = router;