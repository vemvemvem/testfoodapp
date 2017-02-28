// 1.0 Require modules

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// 1.5 Set up db

var url = 'mongodb://maciej:password@ds145997.mlab.com:45997/foodtest'

// 2.0 Connect to MongoDB

setTimeout(function() {mongoose.connect(url, function(error){
	if(error){
		throw error
	}
})}, 5)

mongoose.connection.once('open', function() {console.log("Connected to MongoDB for the first time !")})
mongoose.connection.on('connect', function() {console.log("Connected to MongoDB again !")})
mongoose.connection.on('disconnected', function() {console.log("Connected to MongoDB for the first time !")})