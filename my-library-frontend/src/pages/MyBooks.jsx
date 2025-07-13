import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/mybooks', { withCredentials: true }).then((res) => setBooks(res.data));
  }, []);

  const updateStatus = async (bookId, status) => {
    await axios.patch(`/api/mybooks/${bookId}/status`, { status }, { withCredentials: true });
    setBooks((prev) =>
      prev.map((b) => (b.bookId._id === bookId ? { ...b, status } : b))
    );
  };

  const updateRating = async (bookId, rating) => {
    await axios.patch(`/api/mybooks/${bookId}/rating`, { rating }, { withCredentials: true });
    setBooks((prev) =>
      prev.map((b) => (b.bookId._id === bookId ? { ...b, rating } : b))
    );
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.bookId._id} className="bg-white p-4 rounded shadow">
          <img src={book.bookId.coverImage} alt={book.bookId.title} className="w-full h-48 object-cover rounded" />
          <h2 className="font-bold mt-2">{book.bookId.title}</h2>
          <p className="text-sm text-gray-600">{book.bookId.author}</p>
          <div className="mt-2">
            <select value={book.status} onChange={(e) => updateStatus(book.bookId._id, e.target.value)}>
              <option>Want to Read</option>
              <option>Currently Reading</option>
              <option>Read</option>
            </select>
          </div>
          <div className="mt-2">
            <input
              type="number"
              min="1"
              max="5"
              value={book.rating || ''}
              onChange={(e) => updateRating(book.bookId._id, Number(e.target.value))}
              className="w-full border px-2 py-1"
              placeholder="Rate 1-5"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooks;