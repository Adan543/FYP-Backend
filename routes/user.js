const express = require('express');
const validator = require('../validation/validator')
const UserController = require('../controller/user.controller');

const router = express.Router();

let userController = new UserController()


router.get('/', userController.List.bind(userController) )
router.post('/sign-up', [validator.validate('signUp')],  userController.signUp.bind(userController) )
router.post('/login', [validator.validate('login')],  userController.login)

// Export the router
module.exports = router;
