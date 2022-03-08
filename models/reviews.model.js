const db = require("../db/connection.js");

exports.selectReviewById = (id) => {
  const { review_id } = id;

  return db
    .query(
      `SELECT reviews.*, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id=$1 GROUP BY reviews.review_id`,
      [review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateReviewVotes = (incVotes, id) => {
  return db
    .query(
      `UPDATE reviews SET votes= votes + $1 WHERE review_id=$2 RETURNING *;`,
      [incVotes, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectOrderedReview = (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
  const valuesArray = [];

  let sqlQuery = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    sqlQuery += ` WHERE category = $1`;
    valuesArray.push(category);
  }

  sqlQuery += ` GROUP BY 
     reviews.review_id ORDER BY ${sort_by} ${order};`;

  return db.query(sqlQuery, valuesArray).then(({ rows }) => {
    return rows;
  });
};

exports.addReview = (review) => {
  const { owner, title, review_body, designer, category } = review;
  
  return db
    .query(
      `INSERT INTO reviews (owner, title, review_body, designer, category) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [owner, title, review_body, designer, category]
    )
    .then(({ rows }) => {
      return rows[0]
    })
};
