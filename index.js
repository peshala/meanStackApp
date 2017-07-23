var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var path = require('path');

var authentication = require('./routes/authentication');

mongoose.connect('mongodb://localhost/blog',{ useMongoClient: true });
mongoose.Promise = global.Promise;





var app = express();
var router = express.router;

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// var authentication = require('./routes/authentication')(router);




app.use('/authentication',authentication);


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//flash middleware
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();
});


// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use(express.static(__dirname+'/front/dist/'));
// authenticate route
// app.use('/authenticate',authenticate);
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/front/dist/index.html'))

});

app.listen(4000, function(){
  console.log('running on 4000');
});
