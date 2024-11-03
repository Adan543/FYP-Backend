const express = require('express');
const validator = require('../validation/validator')
const ServiceController = require('../controller/service.controller');

const router = express.Router();

let serviceController = new ServiceController()


router.get('/', serviceController.List.bind(serviceController) )
router.post('/summarize', [validator.validate('summarize')],  serviceController.summarization.bind(serviceController) )
router.post('/translate', [validator.validate('translate')],  serviceController.translation.bind(serviceController) )

// Export the router
module.exports = router;
