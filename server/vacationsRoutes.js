/* VACATIONS */
const router = require('express').Router();
const db = require('./connect-DB');


/* ADD a Follower to a specific VACATION */
router.post("/follow/:id", async (req, res) => {
    let q = `INSERT INTO vacations_of_users
            (user_id, vacation_id)
            VALUES
            (${req.body.userId},${req.body.vacationId})`;

    try {
        const results = await Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/* REMOVE a Follower from a specific VACATION */
router.delete("/unfollow/:userId/:vacId", async (req, res) => {
    let q = `DELETE from vacations_of_users
            WHERE user_id=${req.params.userId} and vacation_id=${req.params.vacId} `;

    try {
        const results = await Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* מחזירה כמות עוקבים של כל החופשות שעוקבים אחריהן */
router.get("/followers", async (req, res) => {
    let q = `SELECT COUNT(vacation_id) as followersNum,
    vacations.location
        FROM vacations join vacations_of_users  on vacations.vacationID = vacations_of_users.vacation_id
        group by vacations.vacationId`;

    try {
        const results = await Query(q);
        res.json(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/* מחזירה כמות עוקבים של חופשה ספציפית */
router.get("/followers/:vacId", async (req, res) => {
    let q = `SELECT COUNT(vacation_id) as followersNum,
    vacations.location
        FROM vacations join vacations_of_users  on vacations.vacationID = vacations_of_users.vacation_id
        WHERE vacations.vacationID=${req.params.vacId}
        group by vacations.vacationId`;

    try {
        const results = await Query(q);
        res.json(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

router.post("/unfollowedVacations", async (req, res) => {
    const vacations = req.body;
    let q = `SELECT * FROM vacations WHERE vacationID NOT IN (?)`

    let values = [vacations.map(vac => {
        return vac.vacationID
    })]

    try {
        const results = await QueryWithArray(q, values);
        res.send(results);

    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

})

/* Display SEARCH RESULTS by DESCRIPTION */
router.post("/search", async (req, res) => {
    const { description, dateGo, dateBack } = req.body;
    console.log(req.body)
    let q = `SELECT 
    *
    FROM vacations WHERE 1=1`;

    if (dateGo && dateBack) {
        q += ` AND dateGo > "${dateGo}" AND dateBack < "${dateBack}"`;
    }

    if (description !== undefined) {
        q += ` AND description LIKE "%${description}%"`;
    }


    try {
        const results = await Query(q);
        console.log(description)
        res.send(results);

    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* Display the VACATIONS of a specific USER */
router.get("/:id", async (req, res) => {
    let q = ` SELECT 
    vacations.vacationID,
     vacations.description,
     vacations.location,
     vacations.price,
     vacations.picture,
     vacations.dateGo,
     vacations.dateBack,
     vacations.followersNum
     FROM vacationdb.vacations_of_users
     INNER JOIN users on users.userID = vacations_of_users.user_id
     INNER JOIN vacations on vacations.vacationID = vacations_of_users.vacation_id
     WHERE users.userID = ${req.params.id}`;
    try {
        const results = await Query(q);
        res.send(results);

    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* Display all the VACATIONS */
router.get("/", async (req, res) => {
    let q = `SELECT * FROM vacationdb.vacations`;
    try {
        const results = await Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
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

function QueryWithArray(q, array) {
    return new Promise((resolve, reject) => {
        db.query(q, array, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
};

/* מעדכנת את מספר העוקבים של חופשה ספציפית */
// router.put("/followersnum/:id", async (req, res) => {
//     let q = `UPDATE vacations
//             SET followersNum = 0
//             WHERE vacationID=${req.params.id}`; /* לשנות את מספר העוקבים למשתנה */

//     try {
//         const results = await Query(q);
//         res.send(results);
//     }
//     catch (err) {
//         res.sendStatus(500);
//         throw err;
//     }
// });