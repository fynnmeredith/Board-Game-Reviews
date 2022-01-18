const db = require('../db/connection.js')
const { commentData } = require('../db/data/test-data/index.js')

exports.selectReviewById = (id) => {
     const { review_id } = id

    // return db.query(`SELECT review_id FROM comments WHERE review_id = $1`, [review_id]).then(({rows}) => {return rows.length}).then((length) => {
    //     return db.query(`SELECT * FROM reviews WHERE review_id =$1`, [review_id])
    // })
    
   return db.query(`SELECT reviews.*, COUNT (comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id=$1 GROUP BY reviews.review_id`, [review_id]).then(({rows}) => {
        console.log(rows)
    })
    
}
