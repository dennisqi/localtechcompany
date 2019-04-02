var express = require('express');
var router = express.Router();
var company_controller = require('../controllers/companyController');


router.get('/', function (req, res, next) {
  res.redirect('/companies');
});

router.get('/company/create', company_controller.company_create_get);

router.post('/company/create', company_controller.company_create_post);

router.get('/company/:id/delete', company_controller.company_delete_get);

router.post('/company/:id/delete', company_controller.company_delete_post);

router.get('/company/:id/update', company_controller.company_update_get);

router.post('/company/:id/update', company_controller.company_update_post);

router.get('/company/:id', company_controller.company_detail);

router.get('/companies', company_controller.company_list);

module.exports = router;