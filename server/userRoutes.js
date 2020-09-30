/* USERS */

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passwords = require('./passwords');
const db = require('./connect-DB');
const onlyUsers = require('./mw');

let usersArr;

/* GET the USERS ARRAY from the DB */
router.use(async (req, res, next) => {
    let q = `SELECT 
    userID ,username, password, firstName , isAdmin
    FROM vacationdb.users;`;
    try {
        const results = await Query(q);
        usersArr = results;
        // console.log(usersArr);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
    next();
});

/* LOGIN request - create a token for the user */
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = usersArr.filter(u => u.username == req.body.username);
        if (user.length) {
            const userObj = user[0];
            if (bcrypt.compareSync(req.body.password, userObj.password)) {
                jwt.sign(
                    {
                        username: userObj.username,
                        isAdmin: userObj.isAdmin,
                        userID: userObj.userID,
                        firstName: userObj.firstName
                    },
                    passwords.JWT_Secret,
                    { expiresIn: "10m" },
                    (err, token) => {
                        if (err) {
                            res.sendStatus(500);
                            throw err;
                        }
                        // console.log(token);
                        console.log(userObj);
                        res.status(201).json({ "token": token, "user_id": userObj.userID, "is_admin": userObj.isAdmin, "first_name": userObj.firstName });

                    });
            }
            else {
                res.status(400).send("Wrong password");
            }
        } else {
            res.status(400).send("User not found");
        }
    } else {
        res.status(400).send("Missing some info");
    }

});

/* REGISTERETION request - create a new user */
router.post("/register", async (req, res) => {
    const { firstName, lastName, username, password, isAdmin } = req.body;
    if (firstName && lastName && username && password && isAdmin != undefined) {
        // const user = usersArr.filter(u => u.username == req.body.username);
        // if (user.length) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                // console.log(hash);
                /* הוספת היוזר לטבלת היוזרים */
                let q = `INSERT INTO users
                            (firstName, lastName, username, password, isAdmin)
                            VALUES
                            ("${req.body.firstName}","${req.body.lastName}",
                            "${req.body.username}","${hash}",
                            ${req.body.isAdmin})
                            `;
                try {
                    const results = await Query(q);
                    console.log(results);
                    res.sendStatus(201);
                }
                catch (err) {
                    res.sendStatus(500);
                    throw err;
                }
            });
        });
    } else {
        res.status(400).send("Missing some info");
    }
});

module.exports = router;

/* פונקציה שאנחנו כותבים כדי להפוך את הספריה של אסקיואל לבעלת יכולת להחזיר הבטחה */
function Query(q) {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
};