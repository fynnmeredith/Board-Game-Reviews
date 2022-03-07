const { selectUsernames, selectUserByUsername } = require("../models/users.model")


exports.getUsernames = (req, res, next) => {
    selectUsernames().then((usernames) => {
        res.status(200).send(usernames)
    })
        .catch((error) => {
            next(error)
        })
};

exports.getUserByUsername = (req, res, next) => { 
    const username = req.params;

    selectUserByUsername(username).then((user) => {
        if(user) {
            res.status(200).send({ user })
        } else {
            return Promise.reject({ status: 404, msg: "Not Found"});
        }
    })
    .catch((error) => {
        next(error)
    })
};