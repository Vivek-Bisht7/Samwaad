const express = require('express');
const router = express.Router();
const {sendMessage , getAllMessages,uploadFile} = require('../controllers/messageControllers');
const {authenticateUser} = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');


router.post("/",authenticateUser,sendMessage);
router.get("/:chatId",authenticateUser,getAllMessages);
router.post("/:type",authenticateUser,upload.single('file'),uploadFile);

module.exports = router;