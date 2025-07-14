const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMyBooks, addBookToMyList, updateStatus, updateRating } = require('../controllers/myBookController');

router.use(auth);
router.get('/', getMyBooks);
router.post('/add-book', addBookToMyList);
router.patch('/:bookId/status', updateStatus);
router.patch('/:bookId/rating', updateRating);

module.exports = router;