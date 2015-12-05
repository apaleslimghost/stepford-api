var Cron = require('cron').CronJob;
var updateDb = require('./update');

var every2Hours = '0 */2 * * *';

module.exports = new Cron(every2Hours, updateDb);
