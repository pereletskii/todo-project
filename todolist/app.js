const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

const registrationRouter = require('./routers/registrationRouter');
app.use('/registration', registrationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})