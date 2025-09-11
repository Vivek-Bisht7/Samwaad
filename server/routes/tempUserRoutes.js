const express = require('express');
const router = express.Router();
const {createTempUser,verifyOTP} = require('../controllers/tempUserController');

router.post("/",createTempUser);
router.post("/verify",verifyOTP);

module.exports = router;