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
          `Operações relacionadas a usuários: cadastro, login e autenticação.<br>
          <img alt=\"alt text\" width="500px" src=\"https://private-user-images.githubusercontent.com/99662198/432074301-a3b7e5d2-f348-44da-8559-f3d9a70ac53f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQyNDU2MjIsIm5iZiI6MTc0NDI0NTMyMiwicGF0aCI6Ii85OTY2MjE5OC80MzIwNzQzMDEtYTNiN2U1ZDItZjM0OC00NGRhLTg1NTktZjNkOWE3MGFjNTNmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDEwVDAwMzUyMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWMyZWU2ZmJmODU1YjI2Mjk5YmZjOTNhNGI4NjA0ZDg5N2YzMDhlYzEwOTFiMzg0NzQwZGE1NDQwNWUyZjQwMmYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.yBBerQKqqJO2emsfZA-vxqoVwkvn4T_zA4sFVG8dkMA">`,
      },
      {
        name: `Clothes`,
        description:
          `Operações de gerenciamento de roupas: listagem, criação, atualização, exclusão e busca por ID.<br>
          <img alt=\"alt text\" width="500px" src=\"https://private-user-images.githubusercontent.com/99662198/432074364-449d08f6-9e05-4227-95c3-87f87210f375.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQyNDUzMzgsIm5iZiI6MTc0NDI0NTAzOCwicGF0aCI6Ii85OTY2MjE5OC80MzIwNzQzNjQtNDQ5ZDA4ZjYtOWUwNS00MjI3LTk1YzMtODdmODcyMTBmMzc1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDEwVDAwMzAzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVjZTNkMGJmNzA3ZWY3MWRkYjAzM2FmNjVmN2NjM2FlMjM2YjVhZDUxYzU4YzM4NGVmNTA1OGRkZjFjOWZhZWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.hsGDLsS-33EK73LSgbIZnNXkX_z6mqmrTu4btknR68w">`,
      },
      {
        name: "ShoppingCarts",
        description:
          `Operações de gerenciamento de carrinho de compras: Listar, Adicionar Item, Deletar Item do Carrinho<br>
          <img alt=\"alt text\" width="500px" src=\"https://private-user-images.githubusercontent.com/99662198/432074255-cf8a6c36-2da8-4d63-abe5-71524759245f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQyNDUzMzgsIm5iZiI6MTc0NDI0NTAzOCwicGF0aCI6Ii85OTY2MjE5OC80MzIwNzQyNTUtY2Y4YTZjMzYtMmRhOC00ZDYzLWFiZTUtNzE1MjQ3NTkyNDVmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDEwVDAwMzAzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5OTYxNmI2M2ZkN2FjZDM2YzNkYjY3YzAwZDRmNjkzNDEyYWExNTVhZGE4ZGEyMDViODYwNjY4NzZkYTI3YTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NFW3BZWZK6fFvwu2I7C1cGH56moo8PMrABF6Kd0hTeY">`,
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js", "./controllers/*.js"], // Caminho para os arquivos que contêm as anotações Swagger
};

export default swaggerOptions;
