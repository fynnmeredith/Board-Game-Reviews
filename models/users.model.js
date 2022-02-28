const db = require("../db/connection.js");

exports.selectUsernames = () => {
  return db.query(`SELECT username FROM users`).then(({ rows }) => {
    return rows;
  });
};
