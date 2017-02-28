// 1. Require modules

var express = require('express')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path')	
var hbs = require('express-handlebars')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

// 1.5 Require local files

var router = require('./routes/routes.js')
var connection = require('./connection.js')

// 1.5 Launch express and express modules

var app = express()
app.use(express.static(path.join(__dirname, 'public')));

// 1.75 Set up views

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout', layoutsDir: path.join(__dirname, '/views/layouts/')}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// 2.0 Invoke middleware

app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({secret:"lol", saveUninitialized: true, resave:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressValidator())


// 3.0 Set up routing

app.use('/', router)

// 4.0 Set up port & listen

var port = process.env.PORT || 8080
app.listen(port, function(){
	console.log("I am listening on port " + port)
})
