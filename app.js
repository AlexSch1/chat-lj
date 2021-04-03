var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const HttpError = require('./error').HttpError;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
console.log('ads')
app.engine('ejs', require('ejs-locals'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('./middleware/sendHttpError'));

if (app.get('env') === 'development') {
  app.use(logger('dev')); // immediate до запроса или после логировать
} else {
  app.use(logger('default'));
}
app.use(express.json()); // req.body app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // req.cookies
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err === 'number') {
    err = new HttpError(err);
  }
  console.log(HttpError)
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

});

module.exports = app;
