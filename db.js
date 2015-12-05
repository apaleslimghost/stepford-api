var PouchDB = require('pouchdb');

exports.db = new PouchDB(process.env.POUCHDB_URI || 'db');
exports.PouchDB = PouchDB;
