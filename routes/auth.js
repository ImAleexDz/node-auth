const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUserUpdate = require('../middlewares/validateUserUpdate');
const authMiddleware = require('../middlewares/authMiddleware');

// Register route
router.post('/register', authController.register);

// Edit user route
router.put('/edit/:id', authMiddleware, validateUserUpdate, authController.editUser);

// Get user details
router.get('/user/:id',authMiddleware,  authController.getUser);

// Get users list
router.get('/users', authMiddleware,  authController.getUsers);

//Delete user
router.delete('/delete/:id', authMiddleware, authController.deleteUser);

//Change password
router.post('/change-password/:id', authMiddleware, authController.changePassword);

// Confirm account
router.get('/confirm/:token', authController.confirmAccount);

module.exports = router;
