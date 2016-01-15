var express = require('express');
var morgan  = require('morgan');
var updCron = require('./cron');
var corsOpen = require('@quarterto/express-cors-wide-open');
var options204 = require('@quarterto/options-204');

var app = express();
app.use(corsOpen);
app.use(options204);
app.use(require('express-pouchdb')(require('./db').PouchDB));


if(module === require.main) {
	var port = process.env.PORT || 3001;

	updCron.start();
	app.use(morgan('dev'));
	app.listen(port, console.log.bind(console, `listening on ${port}`));
} else module.exports = app;
