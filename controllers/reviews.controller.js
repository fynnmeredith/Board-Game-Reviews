const { selectReviewById, updateReviewVotes, selectOrderedReview, selectCommentsByReviewId } = require("../models/reviews.model")


exports.getReviewById = (req, res, next) => {
    const review_id = req.params
    selectReviewById(review_id).then((review) => {
        if(review){
         res.status(200).send({review})
        } else {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
    })
    .catch((error) => {
        next(error)
    })
}

exports.patchReviewVotes = (req, res, next) => {
    const { review_id } = req.params
    const { inc_votes } = req.body
    updateReviewVotes(inc_votes, review_id).then((review) => {
        if (!review) {
        return Promise.reject({status: 404, msg: "Not Found"})
        } else {
            res.status(200).send({ review })
        }
    })
    .catch((error) => {
        next(error)
    })
}

exports.getOrderedReview = (req, res, next) => {
    const { sort_by, order, category } = req.query
    selectOrderedReview(sort_by, order, category).then((reviews) => {
        res.status(200).send({reviews})
    })
    .catch((error) => {
        next(error)
    })
}
