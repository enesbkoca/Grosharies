const express = require("express");
const bodyParser = require('body-parser')
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const items = require('./routes/api/items')

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/items', items)

app.listen(port, () => {
    // // Perform database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });

    console.log(`Server is running on port ${port}`);



});