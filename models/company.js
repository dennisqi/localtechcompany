var mongoose = require('mongoose');
require('mongoose-type-url');

var Schema = mongoose.Schema;

var CompanySchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        job_url: {type: mongoose.SchemaTypes.Url, required: true},
        city: {type: String, required: true, max: 30},
        state: {type: String, required: true, max: 2, min:2},
        home_url: String
    }
);

CompanySchema
    .virtual('url')
    .get(function() {
        return '/company/' + this._id;
    });

module.exports = mongoose.model('Company', CompanySchema);