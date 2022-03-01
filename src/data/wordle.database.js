const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createWordle(word) {
  const uuid = uuidv4();
  await pool.execute('INSERT INTO wordles (id, wordle) VALUES (?, ?)', [
    uuid,
    word,
  ]);
  return uuid;
}

async function checkIsRealWord(word) {
  const uuid = uuidv4();
  const [rows, fields] = await pool.execute(
    'SELECT palabra FROM palabras WHERE palabra = ?',
    [word]
  );
  const response = rows[0]?.wordle;
  pool.end();
  return response;
}

async function getWordle(id) {
  const [rows, fields] = await pool.execute(
    'SELECT wordle FROM wordles WHERE id = ? LIMIT 1',
    [id]
  );
  const response = rows[0]?.wordle;
  return response;
}

module.exports = { createWordle, getWordle };
