const {
  selectReviewById,
  updateReviewVotes,
  selectOrderedReview,
  selectCommentsByReviewId,
  addReview,
  deleteReview
} = require("../models/reviews.model");
const { checkUserExists, checkCategoryExists, checkReviewIdExists } = require('../utils')

exports.getReviewById = (req, res, next) => {
  const review_id = req.params;
  selectReviewById(review_id)
    .then((review) => {
      if (review) {
        res.status(200).send({ review });
      } else {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReviewVotes(inc_votes, review_id)
    .then((review) => {
      if (!review) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        res.status(200).send({ review });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.getOrderedReview = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectOrderedReview(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postReview = (req, res, next) => {
  const newReview = req.body;
  const user = newReview.owner
  const category = newReview.category
  return Promise.all([checkUserExists(user), checkCategoryExists(category)]).then((values) => {
    if(values){
      return addReview(newReview).then((review) => {
        res.status(201).send({ review })
      })
    } 
  })
  .catch((error) => {
    next(error)
  })
};

exports.deleteReviewByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const numberId = parseInt(review_id)

  return checkReviewIdExists(review_id).then((doesIdExist) => {
    if(doesIdExist){
      return deleteReview(review_id).then((review) => {
        res.status(204).send({})
      })
    } else {
      return Promise.reject({ status: 404, msg: "Review not found" });
    }
  })
 .catch((error) => {
   next(error)
 })
};

