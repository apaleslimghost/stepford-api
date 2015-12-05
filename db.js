var PouchDB = require('pouchdb').defaults({prefix: 'pouch/'});

exports.db = new PouchDB(process.env.POUCHDB_URI || 'db');
exports.PouchDB = PouchDB;
