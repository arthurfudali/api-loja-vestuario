// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API - Loja Vestuário",
      description: "API para loja de roupas",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Informa que o formato do token é JWT
        },
      },
    },
  },
  apis: ["./routes/*.js", "./docs/swaggerDocs.yaml", "./controllers/*.js",  "./swagger-docs/swaggerSchemas.yaml"], // Caminho para os arquivos que contêm as anotações Swagger
};

export default swaggerOptions;
