import ShoppingCartService from "../services/ShoppingCartService.js";
import { ObjectId } from "mongodb";
import userService from "../services/userService.js";
const addItemToCart = async (req, res) => {
  try {
    const { idUser, idClothing } = req.params;
    // Verifica se os parâmetros foram enviados
    if (!idUser || !idClothing) {
      return res
        .status(400)
        .json({ error: "ID do usuário e ID da roupa são obrigatórios." });
    }
    // Verifica se os IDs são válidos
    if (!ObjectId.isValid(idUser) || !ObjectId.isValid(idClothing)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    // Adiciona o item ao carrinho
    const updatedCart = await ShoppingCartService.addAProduct(
      idUser,
      idClothing
    );
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res
        .status(404)
        .json({ error: "Carrinho não encontrado ou produto não encontrado." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { idUser, idClothing } = req.params;

    // Validação básica
    if (!idUser || !idClothing) {
      return res
        .status(400)
        .json({ error: "ID do usuário e ID da roupa são obrigatórios." });
    }

    if (!ObjectId.isValid(idUser) || !ObjectId.isValid(idClothing)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Remove o item do carrinho
    const updatedCart = await ShoppingCartService.removeAProduct(
      idUser,
      idClothing
    );

    if (updatedCart) {
      return res.status(200).json(updatedCart);
    } else {
      return res
        .status(404)
        .json({
          error: "Carrinho não encontrado ou roupa não está no carrinho.",
        });
    }
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error.message);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) {
      return res.status(400).json({ error: "ID do usuário é obrigatório." });
    }

    if (!ObjectId.isValid(idUser)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Verifica se o usuário existe
    const user = await userService.getOneById(idUser);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const shoppingCartFound = await ShoppingCartService.getShoppingCartByUserId(
      idUser
    );

    if (!shoppingCartFound) {
      const newShoppingCart =
        ShoppingCartService.createShoppingCarByUserId(idUser);
      return newShoppingCart;
    }

    return res.status(200).json(shoppingCartFound);
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error.message);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { addItemToCart, getCartByUserId, removeItemFromCart };
