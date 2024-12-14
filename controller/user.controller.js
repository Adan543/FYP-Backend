const BaseController = require('./base.controller');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('../validation/validator')
const userConstant = require('../constants/user.constant')
const userMessages = require('../constants/messages/user.message')
const http_response = require('../helper/http_response');

/**
 * user controller extends with base controller
 * @author adan and jawwad
 * @purpose user logic
 */
module.exports = class UserController extends BaseController {

    constructor() {
        /** set bill details model */
        super( 'User');
    }
    
    /**
     * @post
     * login user
     * @param {*} req 
     * @param {*} res 
     */
        async signUp(req, res) {
            try {

                // validation
                const errors = validator.validationErrors(req)
                if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

                let body = req.body

                const selected_db = db['User']
                let user = await selected_db.count({
                    where: { email: body.email } 
                });
                if (user > 0 ) http_response.conflict(res, userMessages.emailExist )
                    
                    console.log('body :>> ', body);
                const hashedPassword = await bcrypt.hash(body.password, userConstant.passwordSalt);
                
                let data = {
                    user_name : `${(body.first_name).trim()} ${(body.last_name).trim()}`,
                    institution_name: body.institute,
                    email:body.email,
                    country:body.country,
                    password:hashedPassword

                }
                console.log('data :>> ', data);
                let response = await selected_db.create(data)
                return http_response.success(res, {status:true, data:response})
                
            } catch (error) {
                return http_response.error(res,  {status:false, data:response})
            }
        }
/**
 * @post
 * Login user with email and password
 * @param {*} req Request object containing email and password
 * @param {*} res Response object
 */
async login(req, res) {
    try {
        // validation
        const errors = validator.validationErrors(req)
        if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

        const { email, password } = req.body;

        const selected_db = db['User'];
        
        const user = await selected_db.findOne({ 
            where: { email },
            include: [{
                model: db.UserHistories
              }]
        });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) { return http_response.unauthorized(res, userMessages.InvalidEmailOrPassword);
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: '96h' 
            }
        );

        return http_response.success(res, {
            message: 'Login successful',
            user: user,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return http_response.error(res, 'An error occurred during login');
    }
}

}