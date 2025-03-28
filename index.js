import express from "express";
import storeRoutes from "./routes/storeRoutes.js";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", storeRoutes); //importar das rotas

app.get("/", (req, res) => {
  const roupas = [{}];
  res.send("Hello, World!");
});
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
  }
});
