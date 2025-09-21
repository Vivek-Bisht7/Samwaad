const express = require('express');
const router = express.Router();
const {registerUser,loginUser,handleRefreshToken} = require('../controllers/userControllers');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh", handleRefreshToken);

module.exports = router;