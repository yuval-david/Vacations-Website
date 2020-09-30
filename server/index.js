const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use("/users", require('./userRoutes'));
app.use("/vacations", require("./vacationsRoutes"));
app.use("/admin", require("./adminRoutes"));


app.listen(1000, console.log("server is working :)"));
