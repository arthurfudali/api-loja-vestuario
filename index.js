import express from "express";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", gameRoutes); //importar das rotas

app.get("/", (req, res) => {
  const roupas = [{}];
});
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
  }
});
