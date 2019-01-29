var router = require('express').Router();
var getController = require('../../controllers/getArticles');

router.get('/', getController.scrape);

module.exports = router;
