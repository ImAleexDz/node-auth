const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUserUpdate = require('../middlewares/validateUserUpdate');

// Register route
router.post('/register', authController.register);

// Edit user route
router.put('/edit/:id', validateUserUpdate, authController.editUser);

// Get user details (for testing purposes)
router.get('/user/:id', authController.getUser);

// Get users list
router.get('/users', authController.getUsers);

//Delete user
router.delete('/delete/:id', authController.deleteUser);

module.exports = router;
