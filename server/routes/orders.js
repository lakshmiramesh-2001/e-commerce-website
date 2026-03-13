import express from 'express';
import Stripe from 'stripe';
import Order from '../models/order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', protect, async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name, images: [item.image] },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    await Order.create({
      user: req.user.id,
      items: items.map(i => ({ product: i.id, qty: i.qty, price: i.price })),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      stripeSessionId: session.id,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
});

export default router;
