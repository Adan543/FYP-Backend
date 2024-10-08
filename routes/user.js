const express = require('express');
const UserController = require('../controller/user.controller');

const router = express.Router();

let userController = new UserController()


router.get('/', userController.List.bind(userController))

// Export the router
module.exports = router;
