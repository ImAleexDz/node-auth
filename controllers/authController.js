// Edit user
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, username, phone } = req.body;

        // Find user by id
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (email) user.email = email;
        if (username) user.username = username;
        if (phone) user.phone = phone;

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
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
