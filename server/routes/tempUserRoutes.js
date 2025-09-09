const express = require('express');
const Router = express.Router();
const {createTempUser} = require('../controllers/tempUserController');

Router.post("/",createTempUser);

module.exports = Router;