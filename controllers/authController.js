
// Controller for authentication logic
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.register = async (req, res) => {
    try {
        const { email, username, password, phone } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with hashed password
        const newUser = await User.create({ email, username, password: hashedPassword, phone });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

// Get user details (for testing purposes)
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by id
        const user = await User.findByPk(id);
        // Exclude password from response
        if (user) {
            user.password = undefined;
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get users list
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        // return users without passwords
        users.forEach(user => {
            user.password = undefined;
        });

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by id
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Change password
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        // Find user by id
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}