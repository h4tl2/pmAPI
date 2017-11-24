var express = require('express');
var router = express.Router();

var Card = require('../models/card');

//get card
router.get('/:_id',function(req,res){
    Card.getCardById(req.params._id,function(err,card){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(card);
		}
	})
});

//delete card
router.delete('/:_id',function(req,res){
    Card.deleteCardById(req.params._id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"delete success"})
		}
    })
})

//modify card
router.post('/updateCard',function(req,res){
    cardAtt = req.body;
	Card.updateColumnById(req.body._id,cardAtt,function(err,card){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(card);
		}
	})
});

//create card
router.post('/createCard',function(req,res){
    var newCard = new Card(req.body);
    Card.createCard(newCard,function(err,card){
        if(err) throw err;
        else{
            console.log(card);
            res.send({code:1,message:"successful create card",card:card});
        }
    }) 
});

//push comment
router.post('/pushComment',function(req,res){
    data = req.body;
    card_id = data.card_id;
    comment = data.comment;
    Card.putComment(column_id,comment,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"push success"})
		}
    })
})
//pull comment
router.post('/pullComment',function(req,res){
    data = req.body;
    card_id = data.card_id;
    comment = data.comment;
    Card.removeComment(column_id,comment,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"pull success"})
		}
    })
})
module.exports = router;