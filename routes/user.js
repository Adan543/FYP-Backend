const express = require('express');
const validator = require('../validation/validator')
const UserController = require('../controller/user.controller');

const router = express.Router();

let userController = new UserController()


router.get('/', userController.List.bind(userController) )
router.post('/sign-up', [validator.validate('singUp')],  userController.signUp.bind(userController) )
router.post('/login', [validator.validate('loginIn')],  userController.loginIn)

// Export the router
module.exports = router;
