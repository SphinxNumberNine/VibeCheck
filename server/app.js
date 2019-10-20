const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authenticationRoutes = require('./api/routes/authentication');
const forumRoutes = require('./api/routes/forums');
const profileRoutes = require('./api/routes/profile');


mongoose.connect(
    'mongodb+srv://'+ process.env.MONGO_DB_USER +':'+ process.env.MONGO_DB_PASS +'@vibecheck-eplvx.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        auth: {
            user: process.env.MONGO_DB_USER,
            password: process.env.MONGO_DB_PASS
        },
        useNewUrlParser: true
    },
    function(err, client) {
        if (err) {
            console.log(err);
        }
        console.log('Connected to Mongo DB');
    }
);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        res.status(200).json({});
    }
    next();
});

app.use('/authentication', authenticationRoutes);
app.use('/forums', forumRoutes);
app.use('/profile', profileRoutes);

app.use(function(error, req, res, next) {
    console.log('Uncaught error: '+JSON.stringify({
        'request': req.body,
        'error': error.message
    }, null, 4));
    res.status(500).json({
        message: 'Invalid'
    })
});

module.exports = app;