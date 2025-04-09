import ShoppingCart from "../models/ShoppingCart";
import userService from "./userService";
import { ObjectId } from "mongodb";

class ShoppingCartService {
  async addAProduct(idUser) {
    try {
      if (!ObjectId.isValid(idUser) && !ObjectId.isValid(idProduct)) {
        throw new Error("ID inválido");
      }

      //Primeiro vou buscar o usuário pelo id para certificar que existe
      userService.getOneById(idUser);

      //Buscando se existe carrinho com esse id
    } catch (error) {
      console.log(error);
    }
  }

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
}
