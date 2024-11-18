const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tests API',
      version: '1.0.0',
      description: 'API for managing courses and videos',
    },
    servers: [
      {
        url: `${process.env.BASE_URL || 'http://localhost:5000'}`,
      },
    ],
    components: {
      schemas: {
        Test: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'array', items: { type: 'string' } },
          },
        },
        Question: {
          type: 'object',
          properties: {
            questionId: { type: 'string' },
            questionText: { type: 'string' },
          },
        },
        Result: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            testId: { type: 'string' },
            score: { type: 'object' },
            personalityType: { type: 'object' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        PersonalityType: {
          type: 'object',
          properties: {
            shortDescription: { type: 'string' },
            longDescription: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
