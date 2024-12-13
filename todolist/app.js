const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

function baseInfo(req, res) {
    console.log(req.path, req.query);
    console.log(req.body);
    res.send(`${req.method} response`);
}

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.route('/')
    .get((req, res) => {
        baseInfo(req, res);
    })
    .post((req, res) => {
        baseInfo(req, res);
    })