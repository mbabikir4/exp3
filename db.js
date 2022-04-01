const {Pool} = require('pg');

const pool = new Pool({
    user: 'ftelzadt',
    database: 'ftelzadt',
    password: '47ZKs6PzEl11kJCk4RpSrO4pRdW3pAZj',
    port: '5432',
    host: 'rogue.db.elephantsql.com',

})

module.exports = pool;