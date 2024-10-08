const express = require('express');
const BaseController = require('../controller/base.controller');
const router = express.Router();

let baseController = new BaseController('config')

router.get('/', (req, res) => {
  res.send(`
    <h3>
      Hello from the 
      <span style="font-size: 2em; display: inline-block;">ADAN!</span>
    </h3>
  `);
});

router.get('/get', baseController.List.bind(baseController))

// Export the router
module.exports = router;
