var d = require('../db');
var next = new d.PouchDB('transactions2');
var hash = require('object-hash');
var pick = require('lodash.pick');

function getId(tx) {
    return new Date(tx.date).toISOString() + '-' + hash(pick(tx, ['date', 'payee', 'amount']));
}

d.db.allDocs({include_docs: true}).then(docs => {
    console.log(docs.rows.length);
    return Promise.all(docs.rows.map(r => {
        var tx = r.doc;
        var id = tx._id;
        tx._id = undefined;
        return next.put(tx, getId(tx), r.rev).then(() => {
            console.log(tx.date);
        });
    }));
}).then(() => console.log('done'), e => {console.error(e)});
