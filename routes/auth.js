const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUserUpdate = require('../middlewares/validateUserUpdate');
const authMiddleware = require('../middlewares/authMiddleware');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id, role: req.user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set cookie with token (same as login controller)
        const cookieName = process.env.NODE_ENV === 'production' 
            ? '__Secure-next-auth.session-token' 
            : 'next-auth.session-token';

        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
            path: '/'
        });

        //redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/`);
        
    }
)

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
