import express from 'express';
import dotenv from 'dotenv';
import { connect, connection as _connection } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

//connect to mongodb
const URL = process.env.MONGODB_URL;

connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = _connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});