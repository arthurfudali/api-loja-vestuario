import ShoppingCart from "../models/ShoppingCart.js";
import userService from "./userService.js";
import storeService from "./storeService.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

class ShoppingCartService {
  async getOneById(id) {
    try {
      if (ObjectId.isValid(id)) {
        const shoppingCart = await ShoppingCart.findOne({ _id: id });
        return shoppingCart;
      } else {
        throw new Error("ID inválido");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getOneByUserId(id) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const shoppingCart = await ShoppingCart.findOne({ user: id });
        return shoppingCart;
      } else {
        throw new Error("ID inválido");
      }
    } catch (error) {
      console.log(error);
      throw error; // É bom repassar o erro para o controller lidar com isso também
    }
  }

  async addAProduct(idUser, idClothing) {
    try {
      if (!ObjectId.isValid(idUser) && !ObjectId.isValid(idClothing)) {
        throw new Error("ID inválido");
      }

      //Primeiro vou buscar o usuário pelo id para certificar que existe
      const user = await userService.getOneById(idUser);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Busca o carrinho do usuário
      const shoppingCartFound = await this.getOneByUserId(idUser);

      const clothingFound = await storeService.getClothesById(idClothing);

      if (!clothingFound) {
        throw new Error("Roupa não encontrada");
      }

      if (shoppingCartFound) {
        const existingItem = shoppingCartFound.clothes.find(
          (item) => item.clothing.toString() === idClothing
        );

        if (existingItem) {
          // Produto já está no carrinho → aumentar quantidade
          const updatedCart = await ShoppingCart.findOneAndUpdate(
            { user: idUser, "clothes.clothing": idClothing },
            { $inc: { "clothes.$.quantity": 1 } },
            { new: true }
          );
          return updatedCart;
        } else {
          // Item ainda não está no carrinho → adicionar ao array
          const updatedCart = await ShoppingCart.findOneAndUpdate(
            { user: idUser },
            {
              $push: {
                clothes: { clothing: idClothing, quantity: 1 },
              },
            },
            { new: true }
          );
          return updatedCart;
        }
      }

      // Cria um novo carrinho
      const newShoppingCart = await ShoppingCart.create({
        user: idUser,
        clothes: [{ clothing: idClothing, quantity: 1 }],
      });
      // Retorna o carrinho recém-criado
      return newShoppingCart;
    } catch (error) {
      console.log(error);
    }
  }

  async removeAProduct(idUser, idClothing) {
    try {
      if (!ObjectId.isValid(idUser) || !ObjectId.isValid(idClothing)) {
        throw new Error("ID inválido");
      }

      // Verifica se o usuário existe
      const user = await userService.getOneById(idUser);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Busca o carrinho
      const shoppingCartFound = await this.getOneByUserId(idUser);
      if (!shoppingCartFound) {
        throw new Error("Carrinho não encontrado");
      }

      const existingItem = shoppingCartFound.clothes.find(
        (item) => item.clothing.toString() === idClothing
      );

      if (!existingItem) {
        return shoppingCartFound;
      }

      if (existingItem.quantity > 1) {
        // Diminui a quantidade em 1
        const updatedCart = await ShoppingCart.findOneAndUpdate(
          { user: idUser, "clothes.clothing": idClothing },
          { $inc: { "clothes.$.quantity": -1 } },
          { new: true }
        );
        return updatedCart;
      } else {
        // Se quantidade é 1, remove o item do array
        const updatedCart = await ShoppingCart.findOneAndUpdate(
          { user: idUser },
          { $pull: { clothes: { clothing: idClothing } } },
          { new: true }
        );
        return updatedCart;
      }
    } catch (error) {
      console.error("Erro ao remover roupa do carrinho:", error.message);
      throw error;
    }
  }

  async getShoppingCartByUserId(idUser) {
    try {
      if (!ObjectId.isValid(idUser)) {
        throw new Error("ID inválido");
      }

      // Verifica se o usuário existe
      const user = await userService.getOneById(idUser);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Busca o carrinho do usuário
      const shoppingCart = await ShoppingCart.findOne({ user: idUser })
        .populate("clothes.clothing", "-description._id")
        .select("clothes.quantity");        

      return shoppingCart;
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error.message);
      throw error;
    }
  }

  async createShoppingCarByUserId(idUser) {
    try {
      if (!ObjectId.isValid(idUser)) {
        throw new Error("ID inválido");
      }

      // Verifica se o usuário existe
      const user = await userService.getOneById(idUser);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Cria um novo carrinho
      const newShoppingCart = await ShoppingCart.create({
        user: idUser,
        clothes: [],
      });
      return newShoppingCart;
    } catch (error) {
      console.error("Erro ao criar carrinho:", error.message);
      throw error;
    }
  }
}

export default new ShoppingCartService();
