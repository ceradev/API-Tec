const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.render('user_info', { title : 'API Tec - User' });
});

router.get('/components', (req, res) => {
    res.render('components_info', { title : 'API Tec - Your Components' });
});

router.get('/component', (req, res) => {
    res.render('view_component', { title : 'API Tec - Component Info' });
})

module.exports = router;