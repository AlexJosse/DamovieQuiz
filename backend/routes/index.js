const express = require('express');
const collections = require('./collections.route');

const router = express.Router();

router.use('/game/play', collections);

module.exports = router;
