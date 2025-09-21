const express = require('express');
const router = express.Router();
const {sendMessage , getAllMessages} = require('../controllers/messageControllers');
const {authenticateUser} = require('../middleware/authMiddleware');


router.post("/",authenticateUser,sendMessage);
router.get("/:chatId",authenticateUser,getAllMessages);

module.exports = router;