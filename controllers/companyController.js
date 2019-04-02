var Company = require('../models/company');


// Display list of all companies.
exports.company_list = function (req, res, next) {
    Company.find()
        .exec(function(err, companies) {
            if (err) {
                return next(next);
            }
            res.render('company_list', {title: 'Companies', companies: companies});
        })
};

// Display detail page for a specific company.
exports.company_detail = function (req, res) {
    Company.findById(req.params.id)
        .exec(function(err, company) {
            if (err) {
                return next(next);
            }
            res.render('company_detail', {title: 'Company', company: company});
        })
};

// Display company create form on GET.
exports.company_create_get = function (req, res) {
    return res.render('company_form', {title: 'Create Company'});
};

// Handle company create on POST.
exports.company_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: company create POST');
};

// Display company delete form on GET.
exports.company_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: company delete GET');
};

// Handle company delete on POST.
exports.company_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: company delete POST');
};

// Display company update form on GET.
exports.company_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: company update GET');
};

// Handle company update on POST.
exports.company_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: company update POST');
};