// const app = require('../app')

// app.all('*', (req, res) => {
// 	res.status(404).send({ msg: 'Not Found' });
// });
// app.use((err, req, res, next) => {
// 	if (err.code === '22P02' || err.code === '23502') {
// 		res.status(400).send({ msg: 'Bad Request' });
// 	} else {
// 		next(err);
// 	}
// });
// app.use((err, req, res, next) => {
// 	if (err.status) {
// 		res.status(err.status).send({ msg: err.msg });
// 	} else {
// 		next(err);
// 	}
// });
// app.use((err, req, res, next) => {
// 	res.status(500).send({ msg: 'Internal server error' });
// });