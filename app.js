var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Handlebars = require('hbs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appscrip_database');

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quizRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



Handlebars.registerHelper('ifCond', function(v1, options) {
  if(v1 == 'radio') {
    return options.fn(this);
  }
  return options.inverse(this);
});




app.use('/', indexRouter);
app.use('/quiz', quizRouter);


app.get('**', function (req, res, next) {
  res.send('route to this path does not exists');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
