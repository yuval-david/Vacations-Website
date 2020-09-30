/* ADMIN */

const router = require('express').Router();
const db = require('./connect-DB');
const { onlyAdmin } = require('./mw');

/* MW to Delete Request - in order to avoid an error*/
router.use("/delete/:id", onlyAdmin, async (req, res, next) => {
    let q = `DELETE from vacations_of_users
    WHERE vacation_id=${req.params.id};`;
    try {
        const results = await Query(q);
        console.log(results);
        res.status(201);
        next();
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* ADD a VACATION */
router.post("/add", onlyAdmin, async (req, res) => {

    let q = `INSERT INTO vacations
    (description, location, picture, dateGO, dateBack, price)
    VALUES
    ("${req.body.description}","${req.body.location}",
    "${req.body.picture}","${req.body.dateGo}",
    "${req.body.dateBack}",${req.body.price})`;

    const { description, location, picture, dateGo, dateBack, price } = req.body;
    if (description && location && picture && dateGo && dateBack && price) {
        try {
            const results = await Query(q);
            console.log(results);
            res.status(201).send("Your vacation was added!");
        }
        catch (err) {
            res.sendStatus(500);
            throw err;
        }
    } else {
        res.status(401).send("Missing some info");
        console.log(req.body);
    }

});

/* DELETE a specific VACATION */
router.delete("/delete/:id", onlyAdmin, async (req, res) => {
    let q = `
    DELETE FROM vacations
    WHERE vacationID=${req.params.id};`;
    try {
        const results = await Query(q);
        console.log(results);
        res.status(201).send("Your vacation deleted!");
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


/* EDIT a specific VACATION */
router.put("/edit/:id", onlyAdmin, async (req, res) => {
    let q = `UPDATE vacations
    SET description="${req.body.description}", location="${req.body.location}",
    picture="${req.body.picture}",dateGo="${req.body.dateGo}",
    dateBack="${req.body.dateBack}", price=${req.body.price}
    WHERE vacationID=${req.params.id}`;

    try {
        const results = await Query(q);
        console.log(results);
        res.status(201).send("Your vacation updated sucsessfully!");
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

module.exports = router;


/* פונקציה כדי להפוך את הספריה של אסקיואל לבעלת יכולת להחזיר הבטחה */
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