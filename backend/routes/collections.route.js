const express = require('express');
const {
    getMovieAndActorHandler,
    checkMovieAndActorHandler,
} = require('../controllers/collections.controller');

const router = express.Router();

router.get('/', getMovieAndActorHandler);
router.post('/', checkMovieAndActorHandler)
module.exports = router;
