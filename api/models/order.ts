import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  placed: Date,
  items: [{
    item_id: mongoose.Types.ObjectId,
    quantity: Number
  }],

})

const Order = mongoose.model('order',schema);

export default Order;