const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API to manage contacts',
    },
    host: "week1-cse340.onrender.com",
    schemes: ['https'],
    basePath: '/contacts',
  };

  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/contactRoutes.js'];

  swaggerAutogen(outputFile, endpointsFiles, doc);
