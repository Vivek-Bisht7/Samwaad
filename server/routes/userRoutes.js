const express = require('express');
const router = express.Router();
const {registerUser,loginUser,handleRefreshToken,handleLogout,getCurrentUser,searchUser,updateProfile} = require('../controllers/userControllers');
const {authenticateUser} = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout",handleLogout)
router.get("/currentUser",authenticateUser,getCurrentUser);
router.post("/getUser",authenticateUser,searchUser);
router.post("/:type",authenticateUser,upload.single('file'),updateProfile);

module.exports = router;