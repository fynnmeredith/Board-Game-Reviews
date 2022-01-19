const db = require('../db/connection.js')
const { values } = require('../db/data/test-data/categories.js')
const { commentData } = require('../db/data/test-data/index.js')

exports.selectReviewById = (id) => {
     const { review_id } = id

    return db.query(`SELECT reviews.*, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id=$1 GROUP BY reviews.review_id`, [review_id]).then(({rows}) => {
        return rows[0];
    })
}

exports.updateReviewVotes = (incVotes, id) => {
        return db.query(`UPDATE reviews SET votes= votes + $1 WHERE review_id=$2 RETURNING *;`, [incVotes, id]).then(({rows}) => {return rows[0]})
}

exports.selectOrderedReview = (sort_by = 'created_at', order = 'DESC', category) => {

    const validKeys = [
        'owner',
        'title',
        'review_id',
        'review_body',
        'designer',
        'review_img_url',
        'category',
        'created_at',
        'votes',
        'comment_count',
        'ASC',
        'DESC'
    ]

    const valuesArray = [];

    if (!validKeys.includes(sort_by) || !validKeys.includes(order)) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
      }

    let sqlQuery = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;
    
    if(category){
        sqlQuery += ` WHERE category = $1`
        valuesArray.push(category)
    }
 
     sqlQuery += ` GROUP BY 
     reviews.review_id ORDER BY ${sort_by} ${order};`;
   
     return db.query(sqlQuery, valuesArray).then(({rows}) => { 
         return rows
        })
}

exports.selectCommentsByReviewId = (id) => {
    const { reviewId } = id;
    const finalId = Number(Object.values(id));

    return db.query(`SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id= $1`, [finalId]).then(({rows}) => {
        console.log(rows)
        return rows
    })
}
