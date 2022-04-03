const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

//connect to mongodb
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//Routes
const studentRouter = require('./routes/students.js');
app.use('/student', studentRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});