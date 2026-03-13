import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: Number,
    price: Number,
  }],
  total: Number,
  status: { type: String, default: 'pending' },
  stripeSessionId: String,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);