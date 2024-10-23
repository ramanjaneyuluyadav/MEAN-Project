const { json } = require('express');
const Users = require('../models/userModel');
const { default: mongoose } = require('mongoose');

//GetAllUsers
exports.getUsers = async (req, res) => {
    try {
        const result = await Users.find({});

        // console.log(result);
        if (result.length > 0) {  // Check if the result has users
            return res.status(200).json({ result });
        } else {
            return res.status(404).json({ msg: 'Data Not Found!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

//create new user
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for unique email
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const newUser = new Users({
            firstName,
            lastName,
            email,
            phone
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//Update Existing User
exports.UpdateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, email, phone, address } = req.body
        const _id = id;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ message: 'Invalid Id Format' })
        }

        const existUser = await Users.findById({ _id })

        if (!existUser) {
            res.status(404).json({ message: 'Id does not exist!' })
        } else {
            existUser.firstName = firstName;
            existUser.lastName = lastName;
            existUser.email = email;
            existUser.phone = phone;
            existUser.address = address;

            const updatedUser = await existUser.save();
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        }

    } catch (error) {
        console.error('Error updating user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

//Delete User
exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Attempt to delete the user
        const deleteUser = await Users.findByIdAndDelete({ _id: id });

        // Check if the user was found and deleted
        if (!deleteUser) {
            return res.status(404).json({ message: 'Id does not exist!' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deleteUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
