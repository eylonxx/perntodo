const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '6380465',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

module.exports = pool;
