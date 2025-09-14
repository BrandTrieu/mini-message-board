const { get } = require("../app");
const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getOneMessage(username) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE username = $1", [username]);
  return rows;
}

async function insertMessage(username, text, added) {
  await pool.query("INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)", [username, text, added]);
}

async function deleteMessages() {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessages,
  getOneMessage
};