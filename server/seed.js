import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium sound quality with 30hr battery life.'
  },
  {
    name: 'Minimal Watch',
    price: 149.99,
    category: 'accessories',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Sleek stainless steel minimalist watch.'
  },
  {
    name: 'Canvas Sneakers',
    price: 59.99,
    category: 'clothing',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'Classic comfort for everyday wear.'
  },
  {
    name: 'Sunglasses',
    price: 39.99,
    category: 'accessories',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    description: 'UV400 protection with polarized lenses.'
  },
  {
    name: 'Backpack',
    price: 89.99,
    category: 'accessories',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Durable 30L backpack for everyday use.'
  },
  {
    name: 'Bluetooth Speaker',
    price: 49.99,
    category: 'electronics',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    description: 'Portable speaker with 12hr playtime.'
  }
];

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany();
await Product.insertMany(products);
console.log('✅ Database seeded with', products.length, 'products!');
process.exit(0);
