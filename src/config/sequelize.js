require('dotenv').config({path: `${__dirname}/../../.env`});
const {PGHOST, PGDATABASE, PGUSER, PGPASS, PGPORT} = process.env;

module.exports = {
  'development': {
    'username': PGUSER,
    'password': PGPASS,
    'database': `${PGDATABASE}_development`,
    'host': PGHOST,
    'port': PGPORT,
    'dialect': 'postgres',
  },
  'test': {
    'username': PGUSER,
    'password': PGPASS,
    'database': `${PGDATABASE}_test`,
    'host': PGHOST,
    'port': PGPORT,
    'dialect': 'postgres',
  },
  'production': {
    'username': PGUSER,
    'password': PGPASS,
    'database': `${PGDATABASE}_production`,
    'host': PGHOST,
    'port': PGPORT,
    'dialect': 'postgres',
  },
};
