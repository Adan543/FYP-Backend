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

            // const { text } = req.body;
            const { text, targetLang } = req.body;
            // Check for Urdu-only input
            if (!serviceHelper.isUrdu(text)) {
                return http_response.conflict(res, serviceMessages.EnglishWord);
            }

            const systemMessage = `You are a professional translator. Translate the provided Urdu text into ${targetLang}. Only return the translated text in ${targetLang}. Do not include the original text or any instructions.`;
            const response = await serviceHelper.gptPrompt(systemMessage, text, 'translate', targetLang);
            // const systemMessage = serviceMessages.translateMessage;
            // const response = await serviceHelper.gptPrompt(systemMessage, text, 'translate');

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
