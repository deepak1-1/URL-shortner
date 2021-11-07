
const express = require('express');
const router = express.Router();
const basicController = require('../controllers/basicControllers');


router.get('/', basicController.get_main_page);  

router.post('/', basicController.create_short_url);

router.get('/:shortId', basicController.redirect_to_url);

module.exports = router;