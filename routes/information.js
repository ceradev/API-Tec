const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.render('user_info');
});

router.get('/components', (req, res) => {
    res.render('components_info');
});

router.get('/component', (req, res) => {
    res.render('view_component');
})

module.exports = router;