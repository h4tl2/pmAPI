var express = require('express');
var router = express.Router();

var Column = require('../models/column');

router.get('/',function(req,res){
    res.send("test columns route")
})

//get column
router.get('/:_id',function(req,res){
    Column.getColumnById(req.params._id,function(err,column){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(column);
		}
	})
});

// get by username
// router.get('/:columnName',function(req,res){
//     Column.getUserbyUsername(req.params.columnName,function(err,user){
// 		if(err) {console.log(err); res.send({code:0,message:err})}
// 		else{
// 			res.json(user);
// 		}
// 	})
// });


//create column
router.post('/createColumn',function(req,res){
    var newColumn = new Column({
        columnName : req.body.columnName
    });
        
        Column.createColumn(newColumn,function(err,column){
            if(err) throw err;
            else{
                console.log(column);
                res.send({code:1,message:"successful create column"});
            }
        }) 
});

//update Column
router.post('/updateColumn',function(req,res){
    columnAtt = req.body;
	Column.updateColumnById(req.body._id,columnAtt,function(err,column){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(column);
		}
	})
});

//delete Column
router.delete('/:_id',function(req,res){
    Column.deleteColumnById(req.params._id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"delete success"})
		}
    })
})

// push card in column
router.post('/pushCard',function(req,res){
    data = req.body;
    column_id = data.column_id;
    card_id = data.card_id;
    Project.putCardInColumn(column_id,card_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"push success"})
		}
    })
})

// pull card in column
router.post('/pullCard',function(req,res){
    data = req.body;
    column_id = data.column_id;
    card_id = data.card_id;
    Project.removeCardInColumn(column_id,card_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"pull success"})
		}
    })
})

module.exports = router;