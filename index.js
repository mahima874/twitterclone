const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const userRouter = require('./route/user');
const postRouter = require('./route/post');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const uri = config.get('mongoURI');

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('Error: ' + err))

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});