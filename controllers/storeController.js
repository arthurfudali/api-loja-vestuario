import storeService from "../services/storeService.js";
import { ObjectId } from "mongodb";

const getAllItems = async (req, res) => {
    try {
      const items = await storeService.getAll();
      // Requisição feita com sucesso - Cod. 200 (OK)
      res.status(200).json({ items: items });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  };
  // funcao para cadastrar jogos
  const createItem = async (req, res) => {
    try {
      // capturando valores
      const { name, type, price, description } = req.body;
      // cadastrando no banco
      await storeService.Create(name, type, price, description);
      res.sendStatus(201); // codigo 201 (CREATED)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  };
  // funcao para deletar jogos
  const deleteItem = async (req, res) => {
    try {
      // captura o ID pelo URL da pagina
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        storeService.deleteGame(id);
        res.sendStatus(204); // codigo 204 (no content)
      } else {
        res.sendStatus(400); // 400 (bad request)
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Função para alterar um jogo
  const updateItem = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        // Desestruturação
        //const title = req.body.title
        const { name, type, price, description } = req.body;
        storeService.Update (id, name, type, price, description);
        res.sendStatus(200); // Código 200 (OK): Requisição bem sucedida
      } else {
        res.sendStatus(400); // Código 400 (Bad Request): Requisição mal formada
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  };
  // Função para buscar um único jogo
  const getOneItem = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        const item = await storeService.getOne(id);
        if (!item) {
          res.sendStatus(404); // Código 404: NOT FOUND - Não encontrado
        } else {
          res.status(200).json({ item });
        }
      } else {
        res.sendStatus(400); // Código 400: Bad Request
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // Erro interno do servidor
    }
  };