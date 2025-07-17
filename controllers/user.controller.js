const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Get user by ID
const getUserById = async (req, res, next) => {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Create a new user
const createUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        const newUser = await user.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(error);
    }
}

// Update user by ID
const updateUserById = async (req, res, next) => {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// Delete user by ID
const deleteUserById = async (req, res, next) => {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};