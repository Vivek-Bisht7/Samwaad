const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authMiddleware');
const {createChat , getAllChat ,createGroupChat} = require('../controllers/chatControllers');
const upload = require('../middleware/multerMiddleware');

router.post("/" ,authenticateUser, createChat);
router.get("/" ,authenticateUser, getAllChat);
router.post("/:type",authenticateUser,upload.single('GroupProfileImage'),createGroupChat);


module.exports = router;