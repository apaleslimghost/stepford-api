var express = require('express');
var morgan  = require('morgan');

var app = express();
app.use(morgan('dev'));
app.use(require('express-pouchdb')(require('./db').PouchDB));

app.listen(process.env.PORT || 3001);
