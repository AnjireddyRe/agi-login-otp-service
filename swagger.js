const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OTP Login API',
      version: '1.0.0',
      description: 'API for generating and validating email OTPs'
    },
    servers: [{ url: 'http://localhost:5000' }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
