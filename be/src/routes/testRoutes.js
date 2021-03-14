const express = require('express');
const router = express.Router();

const userController = require('../controllers/testController');

//list of all users (GET)
router.get('/', userController.getTest);

module.exports = router;

