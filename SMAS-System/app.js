require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appointmentsRouter = require('./routes/appointments');

var app = express();

// Database setup
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var pass = process.env['ADMIN_PASS'];
// Create connection to database
var config = {
    userName: 'smasadmin',
    password: pass,
    server: 'smas.database.windows.net',
    options: {
        database: 'SMASDatabase'
        , encrypt: true
    }
}
var connection = new Connection(config);


// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase()
        }
    }
);

function queryDatabase()
{
    console.log('Reading rows from the Table...');
    // Read all rows from table
    request = new Request(
        "SELECT * FROM staff",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
        });
    connection.execSql(request);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/appointments', appointmentsRouter);

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
