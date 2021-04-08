var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const HttpError = require('./error').HttpError;
const mongoose = require('mongoose');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var chatRouter = require('./routes/chat');
var logoutRouter = require('./routes/logout');
var checkAuth = require('./middleware/auth');
const sessionStore = require('./libs/sessionStore');

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

const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'keyboard',
  key: 'sid',
  saveUninitialized: true,
  resave: false,
  cookie: {
    path: '/',
    maxAge: null,
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/chat',
    // mongoOptions: advancedOptions // See below for details
  })
}));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(function(req, res, next) {
//   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//   res.send('Visits '+ req.session.numberOfVisits)
// });

app.use(require('./middleware/loadUser'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/chat', checkAuth,  chatRouter);
app.use('/logout', logoutRouter);

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
