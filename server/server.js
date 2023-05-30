const express = require("express");

const app = express();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => {
    // // Perform database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });

    console.log(`Server is running on port ${port}`);



});