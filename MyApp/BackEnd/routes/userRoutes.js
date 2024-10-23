const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get All Users
router.get('/users', userController.getUsers);

//Create user
router.post('/users', userController.createUser)

//update user
router.put('/users', userController.UpdateUser)

//delete user
router.delete('/users/:id', userController.DeleteUser)

module.exports = router;
