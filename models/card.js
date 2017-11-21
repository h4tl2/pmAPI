var mongoose = require('mongoose');

// Column Schema
var CardSchema = mongoose.Schema({
    cardName: {
		type: String,
        required: true
	},
	desc: {
        type: String,
    },
    assignTo : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    ],
    dueDate :{
        type: Date
    },
    comments: [
		{commentcomment:{type:String},user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'}}
    ]
});


var Card = module.exports = mongoose.model('Card', CardSchema);
//create Card
module.exports.createCard = function(newCard, callback){
    newCard.save(callback);
};

// get Card
module.exports.getCardById = function(id, callback){
	var query = {_id: id};
	Card.findOne(query, callback);
};
// delete Card
module.exports.deleteCardById = function(id, callback){
	Card.remove({ _id: id }, callback); 
};

// modify Card
module.exports.updateCardById = function(id, cardAtt ,callback){
	var query = { _id: id };
    Card.findOneAndUpdate(query, cardAtt, callback)
};

// put AssignTo
module.exports.putAssignTo = function(card_id,user_id,callback){
    var query = {_id:card_id};
    //Column.findOneAndUpdate(query,)
    Card.update(query, { $push: { assignTo: user_id } }, callback)
};
// remove AssignTo
module.exports.removeAssignTo = function(card_id,user_id,callback){
    var query = {_id:card_id};
    //Column.findOneAndUpdate(query,)
    Card.update(query, { $pull: { assignTo: user_id } }, callback)
};

// put comment
module.exports.putComment = function(card_id,comment,callback){
    var query = {_id:card_id};
    //Column.findOneAndUpdate(query,)
    Card.update(query, { $push: { comments: comment } }, callback)
};

//remove comment
module.exports.removeComment = function(card_id,comment,callback){
    var query = {_id:card_id};
    //Column.findOneAndUpdate(query,)
    Card.update(query, { $pull: { comments: comment } }, callback)
};

// get card by queryjson
module.exports.getCardByJson = function(query, callback){
	Card.findOne(query, callback);
};