import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

// funcao para checagem da autenticação
const Authorization = (req, res, next) => {
  // coletar o token do cabeçalho da req
  const authToken = req.headers["authorization"]; // campo authorization do cabeçalho
  if (authToken != undefined) {
    // o token vem em 2 palavras, o tipo e o token em si -> 'bearer 218asidufy78' por isso é necessário um split
    const bearer = authToken.split(" ");
    const token = bearer[1];
    // validando o token
    jwt.verify(token, userController.JWTSecret, (error, data) => {
      if (error) {
        res.status(401).json({ error: "Token inválido" });
      } else {
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token inválido." });
  }
};

export default { Authorization };
