const { selectUsernames } = require("../models/users.model")


exports.getUsernames = (req, res, next) => {
    selectUsernames().then((usernames) => {
        res.status(200).send(usernames)
    })
    .catch((error) => {
        next(error)
    })
}