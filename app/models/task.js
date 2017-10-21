var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
	list_id: {type: mongoose.Schema.Types.ObjectId},            // for refrencing to the list 
    text: {type: String,default: ''},
   // user: {type: monoose.Schema.Types.ObjectId},                 // for supporting multiple users
});