const {Client} = require('pg');

const {PGHOST, PGDATABASE, PGUSER, PGPASS, PGPORT} = process.env;

const client = new Client({
  host: PGHOST || 'localhost',
  database: PGDATABASE || 'default',
  user: PGUSER || 'pg',
  password: PGPASS || '',
  port: PGPORT || 5432,
});
client.connect();

module.exports = client;
