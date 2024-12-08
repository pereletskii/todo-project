const express = require('express')
const app = express()
const port = 3000

function baseInfo(req, res) {
    console.log(req.path, req.query);
    res.send(`${req.method} response`);
}

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