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
        //redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
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

//Add /me endporint to verify after token verification
// router.get('/me', authMiddleware, (req, res) => {
//     try {
//         res.json({
//             id: req.user.id,
//             email: req.user.email,
//             authenticated: true
//         });
//     } catch (error) {
//         console.log('Error in /me endpoint: ', error)
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

module.exports = router;
