import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
})

const Item = mongoose.model("item",schema);

export default Item;