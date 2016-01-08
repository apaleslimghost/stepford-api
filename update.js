var stepford = require('stepford');
var pick = require('lodash.pick');
var max = require('lodash.max');
var hash = require('object-hash');

function toObject(transactions) {
	var obj = {};
	transactions.forEach(function(tx) {
		obj[tx._id] = tx;
	});

	return obj;
}

function hashTx(tx) {
	return new Date(tx.date).toISOString() + '-' + hash(pick(tx, ['date', 'payee', 'amount']));
}

module.exports = function(db, config) {
	return db.allDocs({include_docs: true}).then(function(result) {
		var currentTx = result.rows.map(r => r.doc);
		var currentTxObj = toObject(currentTx);
		var latest = max(currentTx, function(tx) {
			return new Date(tx.date);
		});

		if(latest.date) {
			config.earliest = latest.date;
		}

		return stepford(config).then(function(transactions) {
			return Promise.all(transactions.map(function(tx) {
				var id = hashTx(tx);
				return db.put(tx, id, currentTxObj[id] && currentTxObj[id]._rev);
			}));
		});
	});
};

if(require.main === module) {
	module.exports(
		require('./db').db,
		Object.assign(require('./config.json'), {silent: false})
	).catch(function(err) {
		console.error(err.stack);
		process.exit(1);
	});
}
