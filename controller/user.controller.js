const BaseController = require('./base.controller');
const db = require('../models');

/**
 * user controller extends with base controller
 * @author adan and jawwad
 * @purpose user logic
 */
module.exports = class UserController extends BaseController {

    constructor() {
        /** set bill details model */
        super('config');
    }

}