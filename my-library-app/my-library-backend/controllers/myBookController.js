const MyBook = require('../models/MyBook');

exports.getMyBooks = async (req, res) => {
  const books = await MyBook.find({ userId: req.userId }).populate('bookId');
  res.json(books);
};

exports.addBookToMyList = async (req, res) => {
  const bookId = req.params.bookId;
  const exists = await MyBook.findOne({ userId: req.userId, bookId });
  if (exists) return res.status(400).json({ message: 'Book already added' });
  const book = await MyBook.create({ userId: req.userId, bookId });
  res.json(book);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  await MyBook.findOneAndUpdate({ userId: req.userId, bookId: req.params.bookId }, { status });
  res.json({ message: 'Status updated' });
};

exports.updateRating = async (req, res) => {
  const { rating } = req.body;
  await MyBook.findOneAndUpdate({ userId: req.userId, bookId: req.params.bookId }, { rating });
  res.json({ message: 'Rating updated' });
};