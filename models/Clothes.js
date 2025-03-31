import mongoose from "../config/db-connection.js";

const DescriptionSchema = new mongoose.Schema({
  size: String,
  color: String,
  material: String,
  brand: String,
  madeIn: String,
});

const ClothesSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: DescriptionSchema,
});

const Clothes = mongoose.model("Clothes", ClothesSchema);
export default Clothes;