const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authMiddleware');
const {createChat , getAllChat} = require('../controllers/chatControllers');

router.post("/" ,authenticateUser, createChat);
router.get("/" ,authenticateUser, getAllChat);


module.exports = router;