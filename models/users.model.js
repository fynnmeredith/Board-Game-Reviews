const db = require("../db/connection.js");

exports.selectUsernames = () => {
  return db.query(`SELECT username FROM users`).then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByUsername = (uName) => { 
  const { username } = uName
  
  return db
  .query(
    `SELECT * FROM users WHERE username = $1`, [username]
  )
  .then(({ rows }) => {
    return rows[0]
  })
};