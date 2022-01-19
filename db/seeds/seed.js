const db = require("/Users/fynnmeredith/northcoders/Back-End/be-nc-games/db/connection")
const format = require('pg-format');
const { formatTables } = require('../../utils')

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db.query(`DROP TABLE IF EXISTS comments;`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS reviews;`)
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS users;`)
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS categories`)
  })
  .then(() => {
    return db.query(`CREATE TABLE categories (
      slug VARCHAR(100) UNIQUE PRIMARY KEY,
      description TEXT NOT NULL
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
        username VARCHAR(50) UNIQUE PRIMARY KEY,
        avatar_url TEXT NOT NULL,
        name TEXT NOT NULL
      );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE reviews (
          review_id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          review_body TEXT NOT NULL,
          designer TEXT NOT NULL,
          review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
          votes INT DEFAULT 0 NOT NULL,
          category VARCHAR(100) NOT NULL REFERENCES categories(slug),
          owner VARCHAR(50) NOT NULL REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );`)
  })
  .then(() => {
        return db.query(`CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          author VARCHAR(50) REFERENCES users(username),
          review_id INT REFERENCES reviews(review_id),
          votes INT  DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          body TEXT NOT NULL
        )`)
      })
      // 2. insert data
  .then(() => {
    const formatCat = formatTables(categoryData)
    const sql = format(`INSERT INTO categories (slug, description) VALUES %L RETURNING *;`, formatCat);
    return db.query(sql)
   .then(({ rows }) => {return rows})
  })
  .then(() => {
    const formattedUsers = formatTables(userData)
    const sql = format(`INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`, formattedUsers);
    return db.query(sql)
   .then(({ rows }) => { return rows })
  })
  .then(() => {
    const formattedReviews = formatTables(reviewData);
    const sql = format(`INSERT INTO reviews (title, designer, owner,  review_img_url, review_body, category, created_at, votes) VALUES %L RETURNING *;`, formattedReviews);
    return db.query(sql)
   .then(({ rows }) => {return rows})
  })
  .then(() => {
    const formattedComments = formatTables(commentData)
    const sql = format(`INSERT INTO comments (body, votes, author, review_id, created_at) VALUES %L RETURNING *;`, formattedComments);
    return db.query(sql)
   .then(({ rows }) => {return rows})
  });
}

module.exports = seed;
