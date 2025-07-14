// server/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const books = require('./data/books.json');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedBooks = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log('✅ Books seeded!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();