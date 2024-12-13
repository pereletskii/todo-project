const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = require('./env_config.json').port;

app.use(bodyParser.json());

const allAuthRouter = require('./routers/allAuthRouter');
app.use('/enter', allAuthRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})