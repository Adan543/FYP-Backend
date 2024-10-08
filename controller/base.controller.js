const db = require('../models')
const http_response = require('../helper/http_response');



module.exports = class BaseController {

    /** set model */
    Model = null;
    model = null;

    constructor(model) {
        this.model = model
    }


    async List (req, res){

        try {
            this.Model =  db[this.model];
            let response = await this.Model.findAll();
            return http_response.success(res, response)
        } catch (error) {
            console.error(error);
            return http_response.error(res, error)
        }

    }

    async GetCountOf(req, res) {
        try {
            this.Model =  db[this.model];
            let response = await this.Model.count();
            return http_response.success(res, response)
        } catch (error) {
            console.error(error);
            return http_response.error(res, error)
        }
    }
}