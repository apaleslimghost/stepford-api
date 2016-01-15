var Cron = require('cron').CronJob;
var updateDb = require('./update');
var db = require('./db').db;

var every2Hours = '0 */2 * * *';

module.exports = new Cron(every2Hours, function() {
	updateDb(db, config).catch(function(err) {
		console.error(err.stack);
	});
});
