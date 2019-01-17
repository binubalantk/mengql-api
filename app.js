const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const passport = require('./config/passport');
const userGraph = require('./user-graph');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}


app.use(bodyParser.json());

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//Initialize passport
app.use(passport.initialize());


//setup user graph api end point
userGraph.init(app, config);

//check for the admin graph
if(config.adminContext.hasContext)
{
  //setup admin graph api end point
  const adminGraph = require("./admin-graph");
  adminGraph.init(app, config);
}


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  // handle server errors
  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});




module.exports = app;
