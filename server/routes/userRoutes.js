const express = require('express');
const router = express.Router();
const {registerUser,loginUser,handleRefreshToken,handleLogout,getCurrentUser,searchUser} = require('../controllers/userControllers');
const {authenticateUser} = require('../middleware/authMiddleware');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout",handleLogout)
router.get("/currentUser",authenticateUser,getCurrentUser);
router.post("/getUser",authenticateUser,searchUser);

module.exports = router;