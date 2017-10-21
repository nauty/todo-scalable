var mongoose = require('mongoose');

module.exports = mongoose.model('List', {
    name: {type: String,default: 'demo'},
   // user: {type: monoose.Schema.Types.ObjectId},                 // for supporting multiple users
});