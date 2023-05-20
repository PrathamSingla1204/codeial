const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);

router.get('/signin', usersConrtoller.signin);
router.get('/signup', usersConrtoller.signup);

module.exports = router;