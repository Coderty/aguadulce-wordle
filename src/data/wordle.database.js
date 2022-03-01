const mysql = require('mysql2/promise');
const {
  v4: uuidv4,
} = require('uuid');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


async function createWordle(wordle) {
  const uuid = uuidv4();
  await pool.execute('INSERT INTO wordles (id, wordle) VALUES (?, ?)', [uuid, wordle]);
  pool.end();
  return uuid;
}

async function getWordle(id) {
  console.log({id});
  const [rows, fields] = await pool.execute('SELECT wordle FROM wordles WHERE id = ? LIMIT 1', [id]);
  console.log({rows, fields});
  const response = rows[0]?.wordle;
  console.log({response});
  pool.end();
  return response;
}

module.exports = { createWordle, getWordle }
