const { body, validationResult } = require('express-validator')
// const chargeTypeMessages = require('../constants/messages/charge-type.messages')
// const rateCardMessages = require('../constants/messages/ratecard.messages')
// const contractMessages = require('../constants/messages/contract.messages')
const generalMessages = require('../constants/messages/general.messages')
// const emailMessages = require('../constants/messages/email.messages')
// const datasetMessages = require('../constants/messages/dataset.messages')

exports.validate = (method) => {
    switch (method) {
        case 'signUp': {
            return [
                body('first_name', generalMessages.nameRequiredString).exists().isString(),
                body('last_name', generalMessages.nameRequiredString).exists().isString(),
                body('email', generalMessages.emailRequiredString).exists().isEmail(),
                body('password', generalMessages.passwordRequiredString).exists().isLength({ min: 6 }),
                body('contact', generalMessages.contactRequiredString).exists().isString(),
                body('country', generalMessages.countryRequiredString).exists().isString(),
                body('institute', generalMessages.instituteRequiredString).exists().isString(),
              ];
        }
        case 'login': {
            return [
                body('password', generalMessages.nameRequiredString).exists().isString(),
                body('email', generalMessages.emailRequiredString).exists().isString(),
            ]
        }
        case 'summarize': {
            return [
                body('difficulty', generalMessages.difficultyRequiredString).exists().isString(),
                body('text', generalMessages.textRequiredString).exists().isString(),
            ]
        }
        case 'translate': { 
            return [
                body('text', generalMessages.textRequiredString).exists().isString(),
            ];
        }
    }
}

// ID is required 
exports.idRequired = () => {
    return body('id', generalMessages.idRequiredNumber).exists().isNumeric();
}

exports.validationErrors = (req) => {
    return validationResult(req);
}