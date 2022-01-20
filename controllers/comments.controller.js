const { selectCommentsByReviewId, addComment, deleteComment } = require('../models/comments.model')
const { checkReviewIdExists, checkUserExists } = require('../utils')

exports.getCommentsByReviewId = (req, res, next) => {
    const reviewId = Number(Object.values(req.params));

    return checkReviewIdExists(reviewId).then((reviewExists) => {
        if(reviewExists){
            return selectCommentsByReviewId(reviewId)
            .then((comments) => {
                res.status(200).send({comments})
            })
        } else {
            return Promise.reject({status: 404, msg: 'Review ID Not Found'})
        }
    })
    .catch((error) => {
        next(error)
    })
}

exports.postComment = (req, res, next) => {
    const newComment = req.body 
    const user = req.body.username
    const  reviewId = req.params

    return checkUserExists(user).then((userExists) => {
        if(userExists){
            return addComment(newComment, reviewId).then((comment) => {
        res.status(201).send({comment})
        })
    } else {
        return Promise.reject({status: 404, msg: 'User Not Found'})
    }
 })
    .catch((error) => {
        next(error)
    })
}

exports.deleteCommentbyId = (req, res, next) => {
    const comment_id = req.params;
	deleteComment(comment_id).then(() => {
        res.status(204).send();
	})
    .catch((error) => {
        next(error)
    })
}