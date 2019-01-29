var router = require('express').Router();
var commentController = require('../../controllers/comments');

router.get('/:id', commentController.find);
router.post('/', commentController.create);
router.delete('/:id', commentController.delete);

module.exports = router;
