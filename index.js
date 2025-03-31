import express from "express";
import storeRoutes from "./routes/storeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//SWAGGER
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from "./config/swagger-config.js";
//Banco de dados
import mongoose from "./config/db-connection.js";
//dotenv
import dotenv from "dotenv";
dotenv.config();



//Configurando Express 
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//importar das rotas
app.use("/", storeRoutes); 
app.use("/", userRoutes);


//Documentação:
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  const roupas = [{}];
  res.send("Hello, World!");
});

//Inicializando o servidor
const port = process.env.PORT || 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
    console.log(`Acesse a documentação em: http://localhost:${port}/api-docs`);
  }
});
