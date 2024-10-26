

const BaseController = require('./base.controller');
const db = require('../models');
const validator = require('../validation/validator')
const serviceHelper = require('../helper/service')
const http_response = require('../helper/http_response');
const serviceMessages = require('../constants/messages/service.messages');



/**
 * service controller extends with base controller
 * @author adan and jawwad
 * @purpose srvice  logic
 */
module.exports = class ServiceController extends BaseController {

    constructor() {
        /** set bill details model */
        super( 'User');
    }
    
    /**
     * @post
     * summarize In Urdu and return summarize 
     * @param {*} req 
     * @param {*} res 
     */
        async summarization(req, res) {
            try {

              // validation
              const errors = validator.validationErrors(req)
              if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

              const body = req.body
              console.log('body :>> ', body);

              // Check if the input is in Urdu scripto
              if (!serviceHelper.isUrdu(body.text))  return http_response.conflict(res, serviceMessages.EnglishWord)

              
              let systemMessage = serviceHelper.difficultyCheck(body.difficulty);

              //summarization respose from server
              let response = await serviceHelper.gptPromte(systemMessage, body.text)

              if (!response.status) return http_response.notFound(res, response.message)
              return http_response.success(res, response)
                
            } catch (error) {
                return http_response.error(res, error.message)
            }
        }

}