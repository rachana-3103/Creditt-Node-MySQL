const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');
const { createSchema, loginSchema } = require('../users/validator');
const passport = require('passport');
require('../helpers/passport')(passport);

//user signup
router.post('/signup', createSchema, userController.create);

// user login
router.post('/login', loginSchema, userController.login);

// Get user Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);

// List all users
router.get('/list',  userController.listAllUser);

router.put('/profile', passport.authenticate('jwt', { session: false }), userController.updateProfile);


module.exports = router;