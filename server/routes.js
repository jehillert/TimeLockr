var controller = require('./controllers');
var router = require('express').Router();

router.put('/credentials', controller.credentials.put);
router.post('/credentials', controller.credentials.post);
router.delete('/credentials', controller.credentials.delete);

router.get('/secrets', controller.secrets.get);
router.put('/secrets', controller.secrets.put);
router.post('/secrets', controller.secrets.post);
router.delete('/secrets', controller.secrets.delete);

module.exports = router;

