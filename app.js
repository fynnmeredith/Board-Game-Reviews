const express = require('express');
const { getCategories } = require('./controllers/categories.controller');
const { getReviewById, patchReviewVotes, getOrderedReview } = require('./controllers/reviews.controller');
const {getCommentsByReviewId, postComment, deleteCommentbyId} = require('./controllers/comments.controller');
const app = express();
const fs = require('fs/promises')
// const errors = require('./errors')

app.use(express.json());

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.patch('/api/reviews/:review_id', patchReviewVotes)

app.get('/api/reviews', getOrderedReview)

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId)

app.post('/api/reviews/:review_id/comments', postComment)

app.delete('/api/comments/:comment_id', deleteCommentbyId)

app.get('/api', (req, res, next) => {
	return fs
	.readFile('endpoints.json', 'utf8')
	.then((file) => {
	res.status(200).send(file)
	})
	.catch((err) => {
		next(err)
	});
});

app.all('*', (req, res) => {
	res.status(404).send({ msg: 'Not Found' });
});
app.use((err, req, res, next) => {
	if (err.code === '22P02' || err.code === '23502') {
		res.status(400).send({ msg: 'Bad Request' });
	} else {
		next(err);
	}
});
app.use((err, req, res, next) => {
	if (err.status) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
});
app.use((err, req, res, next) => {
	res.status(500).send({ msg: 'Internal server error' });
});


module.exports = app;