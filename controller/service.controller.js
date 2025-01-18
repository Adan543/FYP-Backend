// controllers/serviceController.js

const BaseController = require('./base.controller');
const serviceHelper = require('../helper/service');
const userHelper = require('../helper/user');
const userConstant = require('../constants/user.constant');
const http_response = require('../helper/http_response');
const serviceMessages = require('../constants/messages/service.messages');
const validator = require('../validation/validator');

module.exports = class ServiceController extends BaseController {
    constructor() {
        super('User');
    }

    async summarization(req, res) {
        try {
            const errors = validator.validationErrors(req);
            if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

            const { text, difficulty } = req.body;

            // Check for Urdu-only input
            if (!serviceHelper.isUrdu(text)) {
                return http_response.conflict(res, serviceMessages.EnglishWord);
            }

            const systemMessage = serviceHelper.difficultyCheck(difficulty);
            const response = await serviceHelper.gptPrompt(systemMessage, text, 'summarize');

            if (!response.status) {
                return http_response.notFound(res, response.message);
            }
            const user_id = userHelper.getUserIdOrEmailFromToken(req);
            let history = await userHelper.saveHistory(user_id, serviceMessages.SUMMARIZATION);
            response.history = history;

            return http_response.success(res,response );
        } catch (error) {
            return http_response.error(res, error.message);
        }
    }

    async translation(req, res) {
        try {
            const errors = validator.validationErrors(req);
            if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

            const { text } = req.body;

            // Check for Urdu-only input
            if (!serviceHelper.isUrdu(text)) {
                return http_response.conflict(res, serviceMessages.EnglishWord);
            }


            const systemMessage = serviceMessages.translateMessage;
            const response = await serviceHelper.gptPrompt(systemMessage, text, 'translate');

            if (!response.status) {
                return http_response.notFound(res, response.message);
            }
            const user_id = userHelper.getUserIdOrEmailFromToken(req);
            let history = await userHelper.saveHistory(user_id, userConstant.TRANSLATION);
            response.history = history;
            return http_response.success(res, response );
        } catch (error) {
            console.log('error :>> ', error);
            return http_response.error(res, error.message);
        }
    }
};


// const BaseController = require('./base.controller');
// const db = require('../models');
// const validator = require('../validation/validator')
// const serviceHelper = require('../helper/service')
// const http_response = require('../helper/http_response');
// const serviceMessages = require('../constants/messages/service.messages');



// /**
//  * service controller extends with base controller
//  * @author adan and jawwad
//  * @purpose srvice  logic
//  */
// module.exports = class ServiceController extends BaseController {

//     constructor() {
//         /** set bill details model */
//         super( 'User');
//     }
    
//     /**
//      * @post
//      * summarize In Urdu and return summarize 
//      * @param {*} req 
//      * @param {*} res 
//      */
//         async summarization(req, res) {
//             try {

//               // validation
//               const errors = validator.validationErrors(req)
//               if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);

//               const body = req.body
//               console.log('body :>> ', body);


//               // Check if the input is in Urdu scripto
//               if (!serviceHelper.isUrdu(body.text))  return http_response.conflict(res, serviceMessages.EnglishWord)

              
//               let systemMessage = serviceHelper.difficultyCheck(body.difficulty);

//               //summarization respose from server
//               let response = await serviceHelper.gptPrompt(systemMessage, body.text,'summarize')

//               if (!response.status) return http_response.notFound(res, response.message)
//               return http_response.success(res, response)
                
//             } catch (error) {
//                 return http_response.error(res, error.message)
//             }
//         }

//         async tranlsation(req, res) {
//             try {
//                 // validation
//                 const errors = validator.validationErrors(req);
//                 if (!errors.isEmpty()) return http_response.validationError(res, errors.array()[0].msg);
        
//                 const body = req.body;
//                 console.log('body :>> ', body);
        
//                 // Check if the input is in Urdu script
//                 if (!serviceHelper.isUrdu(body.text)) return http_response.conflict(res, serviceMessages.EnglishWord);
        
//                 // Set system message for translation
//                 const systemMessage = serviceMessages.translateMessage;
        
//                 // Translation response from server
//                 const response = await serviceHelper.gptPrompt(systemMessage, body.text, 'translate');
        
//                 if (!response.status) return http_response.notFound(res, response.message);
//                 return http_response.success(res, response);
                
//             } catch (error) {
//                 return http_response.error(res, error.message);
//             }
//         }
        

// }