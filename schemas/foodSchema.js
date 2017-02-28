// 1. Require modules

var mongoose = require('mongoose')

// 2. Create Mongoose schema

var schema = mongoose.Schema

// 3. Create schema

var foodSchema = new schema ({
	'name': {type:String, required:true},
	'macros': {
		'carbs': Number,
		'proteins': Number,
		'fats': Number
	},
	'Date': {type: Date, default: Date.now}
})

module.exports = mongoose.model('food',foodSchema)