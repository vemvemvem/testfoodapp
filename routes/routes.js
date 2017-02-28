// 1. Require modules

var express = require('express')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var path = require('path')
var half = 2

// 1.5 Require local files

var foodModel = require('../schemas/foodSchema.js')

// 2. Set up express

var router = express.Router()


router.get('/', function(req,res){
	console.log(req.cookies)
	console.log("==============")
	console.log(req.session)
	res.render('index.hbs', {
		title: "Nutrition app", 
		success: req.session.success,
		errors: req.session.errors
		});
		req.session.errors = null;
		});

router.get('/get_insert', function(req,res) {
	mongoose.connection.collection('foods').insert({"name":"kiwi"},function(err, result){
		if(err){
			throw err;
		} else {
			res.send(result)
		}
	})
});

router.get('/get_create', function(req,res) {
	foodModel.create({"name":"kiwi"}, function(err,result) {
		if(err){
			throw err;
		}	else {
			res.send(result)
		}
	})
})


router.post('/form_post', function(req,res) {
	req.check('name','name is too short').isLength({min:4})
	req.check('carbs','Proteins must be a number').isNumeric({min:1})
	req.check('proteins','Proteins must be a number').isNumeric({min:1})
	req.check('fats','Proteins must be a number').isNumeric({min:1})
	var newFoodModel = new foodModel()
	newFoodModel.name = req.body.name
	newFoodModel.macros.carbs = req.body.carbs
	newFoodModel.macros.proteins = req.body.proteins
	newFoodModel.macros.fats = req.body.fats
	var errors = req.validationErrors();
	var x;
	if (errors){
	req.session.errors = errors
	req.session.success = false;
	res.redirect('/')
	} else {
	newFoodModel.save(function(err, result){
		if(err){
			res.send(err)
		} 
}).then(function() {
		res.render('index', {title:"success", success:true})
	})
}
})	


router.post('/form_query', function(req,res) {
	foodModel.find(function(){
		if(!req.body.querydb){
			console.log("empty querydb")
			return {}
		} else {
			console.log(req.body.querydb)
			return {name:req.body.querydb}
		}
	}).exec(function(err, result) {
		if (err) {
			send(err)
		} else {
			console.log('omg')
		}
	}).then(function(MongoDBdata){
		var data = { items: [] };
		index = [];
		for(var i=0; i < MongoDBdata.length; i++){
		data.items.push({
			index: i+1,
			name: MongoDBdata[i].name,
			carbs: MongoDBdata[i].macros.carbs,
			proteins: MongoDBdata[i].macros.proteins,
			fats: MongoDBdata[i].macros.fats / half

		})}
		res.render('search', {all: data.items})
	})
})

module.exports = router;

