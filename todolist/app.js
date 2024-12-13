const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = require('./env_config.json').port;

app.use(bodyParser.json());

const registrationRouter = require('./routers/registrationRouter');
app.use('/registration', registrationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})