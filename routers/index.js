/**
 * @routers.index.js
 **/

const path = require('path');
const randomize = require('../utils/randomize');
global.WebSocket = null;

const router = require('express').Router({
    caseSensitive: false
});

router.get('/', async(req, res, next) => {
    const socketId = await randomize();
    res.redirect(`/app/${socketId}`);
});

router.get('/app/:socketId', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
