const express = require('express');
const router = express.Router();
const {registerUser,loginUser,handleRefreshToken} = require('../controllers/userControllers');
const {authenticateUser} = require('../middleware/authMiddleware')

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh", handleRefreshToken);
router.get("/protected", authenticateUser, (req, res) => {
  res.json({ message: `Hello Champ 🚀`, user: req.user });
});

module.exports = router;