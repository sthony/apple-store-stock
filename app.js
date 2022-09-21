// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3005;

// app.listen(port);


// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

// console.log('todo list RESTful API server started on: ' + port);
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const indexRouter = require('./routes/index');
const stockRouter = require('./routes/v1/stock');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/check-stock', stockRouter);

app.get('*', (req, res) => {
  return res.status(404).json({
    message: 'wrong route',
  });
});

module.exports = app;

