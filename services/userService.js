import User from "../models/Users.js";
import { ObjectId } from "mongodb";

class userService {
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getOneById(id) {
    try {
      if (ObjectId.isValid(id)) {
        const user = await User.findOne({ _id: id });
        return user;
      } else {
        throw new Error("ID inválido");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async create(name, email, password) {
    try {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
}
export default new userService();
