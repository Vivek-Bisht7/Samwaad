const express = require('express');
const router = express.Router();
const {sendMessage , getAllMessages} = require('../controllers/messageControllers');


router.post("/",sendMessage);
router.get("/:chatId",getAllMessages);

module.exports = router;