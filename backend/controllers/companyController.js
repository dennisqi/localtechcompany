var Company = require('../models/company');


const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display list of all companies.
exports.company_list = function (req, res, next) {
    Company.find(function(err, companies) {
            if (err) {
                return next(next);
            }
            res.render('spa', {title: 'Companies', companies: companies});
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
    return res.render('spa', {title: 'Create Company'});
};

// Handle company create on POST.
exports.company_create_post = [
    body('name', 'Company name must not be empty.').isLength({ min: 1 }).trim(),
    body('job_url', 'Job url must not be empty.').isLength({ min: 1 }).trim(),
    body('city', 'City must not be empty.').isLength({ min: 1 }).trim(),
    body('state', 'State must not be empty.').isLength({ min: 2, max: 2 }).trim(),
    sanitizeBody('state').escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var company = new Company({
            name: req.body.name,
            job_url: req.body.job_url,
            city: req.body.city,
            state: req.body.state,
            home_url: req.body.home_url
        });
        if (!errors.isEmpty()) {
            res.render('spa', {
                name: 'Create Company', company: company, errors: errors.array()
            });
            return;
        } else {
            company.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/companies');
            });
        }
    }
];

// Display company delete form on GET.
exports.company_delete_get = function (req, res, next) {
    Company.findById(req.params.id)
        .exec(function(err, company) {
            if (err) {
                return next(err);
            }
            res.render('company_delete', {title: 'Delete Company', company: company});
            return;
        });
};

// Handle company delete on POST.
exports.company_delete_post = function (req, res, next) {
    Company.findByIdAndDelete(req.body.companyid)
        .exec(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/companies');
        });
};

// Display company update form on GET.
exports.company_update_get = function (req, res) {
    Company.findById(req.params.id)
        .exec(function(err, company) {
            if (err) {
                return next(err);
            }
            res.render('spa', {title: 'Update Company', company: company});
        });
};

// Handle company update on POST.
exports.company_update_post = [
    body('name', 'Company name must not be empty.').isLength({ min: 1 }).trim(),
    body('job_url', 'Job url must not be empty.').isLength({ min: 1 }).trim(),
    body('city', 'City must not be empty.').isLength({ min: 1 }).trim(),
    body('state', 'State must not be empty.').isLength({ min: 2, max: 2 }).trim(),
    sanitizeBody('state').escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var company = new Company({
            name: req.body.name,
            job_url: req.body.job_url,
            city: req.body.city,
            state: req.body.state,
            home_url: req.body.home_url,
            _id: req.params.id
        });
        if (!errors.isEmpty()) {
            res.render('spa', {
                name: 'Create Company', company: company, errors: errors.array()
            });
            return;
        } else {
            Company.findByIdAndUpdate(req.params.id, company, {}, function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/companies');
            });
        }
    }
];