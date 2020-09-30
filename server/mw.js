const jwt = require('jsonwebtoken');
const passwords = require('./passwords');

/********* ONLY ADMIN ************/
function onlyAdmin(req, res, next) {
    if (req.header('Authorization')) {
        jwt.verify(req.header('Authorization'), passwords.JWT_Secret, (err, decoded) => {
            if (err) {
                res.sendStatus(500)
                throw err
            }

            if (decoded.isAdmin) {
                next();
            } else {
                res.status(401).send('You have a token, but you are not an admin.')
            }

        })
    } else {
        res.status(401).send('token not found...')
    }
}


module.exports = { onlyAdmin: onlyAdmin };