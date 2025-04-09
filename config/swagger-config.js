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
    tags: [
      {
        name: "Users",
        description:
          "Operações relacionadas a usuários: cadastro, login e autenticação.",
      },
      {
        name: "Clothes",
        description:
          "Operações de gerenciamento de roupas: listagem, criação, atualização, exclusão e busca por ID.",
      },
      {
        name: "ShoppingCarts",
        description:
          "Operações de gerenciamento de carrinho de compras: Listar, Adicionar Item, Deletar Item do Carrinho",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js", "./controllers/*.js"], // Caminho para os arquivos que contêm as anotações Swagger
};

export default swaggerOptions;
