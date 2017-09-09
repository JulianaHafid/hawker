import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';
import users from './routes/users';
import flash from 'connect-flash';
import session from 'express-session';
const FacebookStrategy = require('passport-facebook').Strategy;
//for database : MongoDB
require('./config/passport')(passport); // pass passport for configuration

//the mongodb path
const configDB = require('./config/database.js');





const app = express();
const debug = Debug('hawkersg:app');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//connect flash
app.use(flash());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'controllers')));

mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
const MongoStore = require('connect-mongo')(session);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "mysecret",
  store: new MongoStore({
    url: configDB.url,
    autoReconnect: true,
    clear_interval: 3600
  })
}));


app.use(passport.initialize());
app.use(passport.session());
//put this first before setting the routes
//Easy to extend with the incoming body if needed
// app.use(function(req, res, next) {
//   console.log( "Method: " + req.method +" Path: " + req.url)
//   next();
// });


app.use('/', index);
app.use('/users', users);

app.use(function(req,res,next){
if (req.user) {
    res.locals.user = req.user;
}
next();
});

app.use(function (req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

app.listen(app.get('port'),function(){
  console.log("Server started on port"+ app.get('port'));
});

export default app;
