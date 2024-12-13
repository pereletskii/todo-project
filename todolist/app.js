const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const registrationController = require('./controllers/registrationController');

function baseInfo(req, res) {
    console.log(req.path, req.query);
    console.log(req.body);
}

app.use(bodyParser.json());
// app.use(baseInfo);

app.route('/registration')
    .post(registrationController);

app.route('/')
    .get((req, res) => {
        baseInfo(req, res);
    })
    .post((req, res) => {
        baseInfo(req, res);
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})