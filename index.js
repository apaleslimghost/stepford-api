var express = require('express');
var morgan  = require('morgan');
var PouchDB = require('pouchdb');

var db = new PouchDB(process.env.POUCHDB_URI || 'db');

var app = express();
app.use(morgan('dev'));
app.use(require('express-pouchdb')(PouchDB));

app.listen(process.env.PORT || 3001);
