require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Router
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/newsRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/feedbackRouter'));

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err)
        throw err;
    console.log('Connected to mongodb')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port:', port);
})