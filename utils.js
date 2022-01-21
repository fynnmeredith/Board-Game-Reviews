const db = require('./db/connection')

exports.formatTables = (data) => {
    return data.map(element => Object.values(element))
}

exports.checkReviewIdExists = (review_id) => {
    return db.query(`SELECT * FROM reviews WHERE review_id=$1`, [review_id])
    .then(({rows}) => {
        if(rows.length){
            return true;
        } else {
            return false
        }
    })
}

exports.checkUserExists = (username) => {
    return db.query(`SELECT * FROM users WHERE username=$1`, [username])
    .then(({rows}) => {
        if(rows.length){
            return true;
        } else {
            return false
        }
    })
}

exports.checkCategoryExists = (category) => {
    return db.query(`SELECT * FROM reviews WHERE category=$1`, [category])
    .then(({rows}) => {
        if(rows.length){
            return true;
        } else {
            return false
        }
    })
}
