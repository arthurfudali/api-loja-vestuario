import Clothes from "../models/Clothes.js";

class storeService {
  async getAll() {
    try {
      const clothes = await Clothes.find();
      return clothes;
    } catch (error) {
      console.log(error);
    }
  }

  async createClothes(name, type, price, description) {
    try {
      const clothes = new Clothes({
        name,
        type,
        price,
        description,
      });
      await clothes.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getClothesById(id) {
    const clothes = await Clothes.findById(id);
    return clothes;
  }

  async updateClothes(id, name, type, price, description) {
    try {
      await Clothes.findByIdAndUpdate(id, {
        name,
        type,
        price,
        description,
      });
      console.log(`Roupa com id ${id} atualizada com sucesso`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteClothes(id) {
    try {
      await Clothes.findByIdAndDelete(id);
      console.log(`Roupa com id ${id} deletada com sucesso`);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new storeService();
