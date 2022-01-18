const { selectReviewById } = require("../models/reviews.model")


exports.getReviewById = (req, res, next) => {
    const review_id = req.params
    selectReviewById(review_id).then((review) => {
        // console.log(review)
        res.status(200).send({review})
    })
}