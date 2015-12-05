var express = require('express');
var morgan  = require('morgan');
var updCron = require('./cron');

var app = express();
app.use(morgan('dev'));
app.use(function(req, res, next) {
	res.set('access-control-allow-origin', req.headers.origin);
	res.set('access-control-allow-credentials', true);
	next();
});
app.use(require('express-pouchdb')(require('./db').PouchDB));

updCron.start();

var port = process.env.PORT || 3001;
app.listen(port, console.log.bind(console, `listening on ${port}`));
