const express = require('express');
const { getCategories } = require('./controllers/categories.controller');
const app = express();

app.use(express.json());

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id')

app.all('*', (req, res) => {
	res.status(404).send({ msg: 'Not Found' });
});





module.exports = app;