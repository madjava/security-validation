const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const { validateUsernamePassword } = require('./api-validations');

// Helmet helps you secure your Express apps by setting various HTTP headers
// Use Helmet as a first/default guard.
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Use Helmet as early as possible
app.use(helmet());

// Use for processing url-encoded inputs 
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/validate', (req, res) => {
    res.render('pages/validate', { title: 'Form Validation' });
});

app.post('/validate', validateUsernamePassword, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.sendStatus(200);
});

app.get('/api', (req, res) => {
    res.render('pages/api', { title: 'Validating API\'s' });
});


app.listen(PORT, () => {
    console.log(`Server up an running on port ${PORT}.`);
});