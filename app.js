const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.render('index');
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;