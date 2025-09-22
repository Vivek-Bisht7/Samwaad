const express = require('express');
const router = express.Router();
const {registerUser,loginUser,handleRefreshToken,handleLogout} = require('../controllers/userControllers');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout",handleLogout)

module.exports = router;