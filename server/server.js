const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 5005;

const items = require('./routes/api/items')

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/items', items)

app.listen(port, () => {
    // // Perform database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`Server is running on port ${port}`);
});

