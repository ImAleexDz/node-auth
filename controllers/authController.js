// Controller for authentication logic
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { email, username, password, phone } = req.body;

        // Create a new user
        const newUser = await User.create({ email, username, password, phone });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
