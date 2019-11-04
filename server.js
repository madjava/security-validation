const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const { validateUsernamePassword, validateExpectedInput, validatePayload } = require('./api-validations');

// Helmet helps you secure your Express apps by setting various HTTP headers
// Use Helmet as a first/default guard.
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Use Helmet as early as possible
app.use(helmet());

// Use for processing url-encoded inputs 
app.use(bodyParser.urlencoded({ extended: false }));

// Use for processing json inputs
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/validate', (req, res) => {
    res.render('pages/validate', { title: 'Form Validation', errors: null });
});

app.post('/validate', validateUsernamePassword, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/validate', { title: 'Form Validation', errors: errors.array() });
    }
    res.sendStatus(200);
});

app.get('/api', (req, res) => {
    res.render('pages/api', { title: 'Validating: Requests' });
});
app.get('/api/polution', (req, res) => {
    res.render('pages/api-2', { title: 'Validating: JSON' });
});
app.get('/api/encoding', (req, res) => {
    res.render('pages/api-3', { title: 'Validating: Encoding' });
});

app.get('/api/malicious', (req, res, next) => {
    const value = (req.query.expected || '').toUpperCase();
    res.json({ expected: value });
});

app.get('/api/malicious/fixed', validateExpectedInput, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json(errors.array());
        // You could send a custom message, here i just send the error object back
    }
    // We can safely assume it's a string and it exists.
    const value = req.query.expected.toUpperCase();
    res.json({ expected: value });
});

app.post('/api/pollution', (req, res, next) => {
    const data = req.body;
    const fullname = `${data.firstname} ${data.lastname}`;
    res.json(fullname);
});

app.post('/api/pollution/fixed', validatePayload, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(404).json(errors.array());
        // You could send a custom message, here i just send the error object back
    }
    const data = req.body;
    const fullname = `${data.firstname} ${data.lastname}`;
    res.json(fullname);
});

// Custom catch all other routes, this will prevent the default 404 page
// You can customise your response or just send a status code. 
app.use((req, res) => {
    return res.status(404).send();
});

app.listen(PORT, () => {
    console.log(`Server up an running on port ${PORT}.`);
});