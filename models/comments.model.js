const db = require("../db/connection.js");

exports.selectCommentsByReviewId = (id) => {
  const reviewId = id;
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id= $1`,
      [reviewId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addComment = (comment, reviewId) => {
  const { username, body } = comment;
  const { review_id } = reviewId;
  return db
    .query(
      `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;`,
      [username, body, review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteComment = (id) => {
  const { comment_id } = id;
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
    .then(() => {});
};
