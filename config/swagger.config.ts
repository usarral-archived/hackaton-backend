export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Aszendix API',
      description: 'Aszendix API Information',
      version: '1.0.0' // Version of the API
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1/'
      }
    ]
  },
  apis: ['./api/router/*.ts'],
  schemas: ['./api/schemas/*.ts'],
  explorer: true
}
