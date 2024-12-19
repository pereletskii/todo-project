const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Todo-project API',
    description: 'Server API of todolist project'
  },
  host: '0.0.0.0:3000'
};

const outputFile = './swagger.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);