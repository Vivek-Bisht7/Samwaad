const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authMiddleware');
const {createChat} = require('../controllers/chatControllers');

router.post("/" ,authenticateUser, createChat);

module.exports = router;