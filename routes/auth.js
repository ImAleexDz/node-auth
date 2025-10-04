const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUserUpdate = require('../middlewares/validateUserUpdate');

// Register route
router.post('/register', authController.register);

// Edit user route
router.put('/edit/:id', validateUserUpdate, authController.editUser);

// Get user details
router.get('/user/:id', authController.getUser);

// Get users list
router.get('/users', authController.getUsers);

//Delete user
router.delete('/delete/:id', authController.deleteUser);

//Change password
router.post('/change-password/:id', authController.changePassword);

// Confirm account
router.get('/confirm/:token', authController.confirmAccount);

module.exports = router;
