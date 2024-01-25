const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.render('user_info');
});

router.get('/components', (req, res) => {
    res.render('user_components');
});

module.exports = router;