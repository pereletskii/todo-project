const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = require('./env_config.json').port;
const cookieParser = require('cookie-parser')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(cookieParser())

const allAuthRouter = require('./routers/allAuthRouter');
app.use('/enter', allAuthRouter);

const todoRouter = require('./routers/todoRouter');
app.use('/todo', todoRouter);

app.get('/', (req, res) => {
    res.redirect('/todo');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})