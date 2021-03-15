const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const config = require('../configs/config.json');
//serverFile = require('./server');

const flash = require('express-flash')

const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
//import routes
const testRoutes = require('./routes/testRoutes');
const volkswirtschaftlicheStandortmodelleRoutes = require('./routes/volkswirtschaflicheStandortmodelleRoutes');

const bodyParser = require('body-parser');
//const app = express();
const path = require('path');

//to be able to access inputs in post method
app.use(bodyParser.json());

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(cookieParser());


//additional security package
var helmet = require('helmet')
app.use(helmet())

//cors
/*
var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.react.proxy);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Access-Control-Allow-Headers, Authorization, Accept,X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials',true)
    res.setHeader('preflightContinue', false)
    next();
}
*/

var allowCrossDomain = function (req, res, next) {
  
  res.header('Access-Control-Allow-Origin', config.react.proxy);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true)
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);
//some other code

//var cors=require('cors');
//app.use(cors({origin:true,credentials: true}));

//defining router
app.use('/test', testRoutes);
app.use('/volkswirtschafliche_standortmodelle',volkswirtschaftlicheStandortmodelleRoutes)



module.exports = app;