const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUserUpdate = require('../middlewares/validateUserUpdate');

// Register route
router.post('/register', authController.register);

// Edit user route
router.put('/edit/:id', validateUserUpdate, authController.editUser);

module.exports = router;
