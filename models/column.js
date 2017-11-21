var mongoose = require('mongoose');

// Column Schema
var ColumnSchema = mongoose.Schema({
	columnName: {
		type: String,
        required: true
	},
	cards: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'card'}
    ]
});

var Column = module.exports = mongoose.model('Column', ColumnSchema);
//create
module.exports.createColumn = function(newColumn, callback){
    newColumn.save(callback);
};
//read by columnid
module.exports.getColumnById = function(id, callback){
	var query = {_id: id};
	Column.findOne(query, callback);
};
//modify column
module.exports.updateColumnById = function(id, columnAtt ,callback){
	var query = { _id: id };
    Column.findOneAndUpdate(query, columnAtt, callback)
};

//update columnname
module.exports.updateColumnnameById = function(id,newColumnname ,callback){
	var query = { _id: id };
    Column.findOneAndUpdate(query, { column_name: newColumnname }, callback)
};

//update card in column
module.exports.putCardInColumn = function(column_id,card_id,callback){
    var query = {_id:column_id};
    //Column.findOneAndUpdate(query,)
    Column.update(query, { $push: { cards: card_id } }, callback)
};
// get Column by queryjson
module.exports.getColumnByJson = function(query, callback){
	Column.findOne(query, callback);
};

//delete
module.exports.deleteColumnById = function(id, callback){
	Column.remove({ _id: id }, callback); 
};

//remove card in column
module.exports.removeCardInColumn = function(column_id,card_id,callback){
    var query = {_id:column_id};
    //Column.findOneAndUpdate(query,)
    Column.update(query, { $pull: { cards: card_id } }, callback)
};
