var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = 'mongodb://localhost:27500/test';
mongoose.connect(url,{useMongoClient: true});

var user_desc = {
    name: String,
    gender: String,
    job: String
}
var schema = new mongoose.Schema(user_desc);

var USERCLASS = mongoose.model('users', schema);

module.exports = USERCLASS;