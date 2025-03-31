import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${USER}:${PASSWORD}${CLUSTER}`
  );

  const connection = mongoose.connection;
  connection.on("error", (err) => {
    console.error("Erro de conexão com o banco de dados", err);
  });
  connection.on("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  });
  connection.on("disconnected", () => {
    console.log("Conexão com o banco de dados encerrada!");
  });
};

connect();
export default mongoose;
