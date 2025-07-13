import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/api/books').then((res) => setBooks(res.data));
  }, []);

  const addToMyBooks = async (bookId) => {
    if (!user) return alert('Please log in to add books.');
    await axios.post(`/api/mybooks/${bookId}`, {}, { withCredentials: true });
    alert('Book added to My Books!');
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book._id} className="bg-white p-4 rounded shadow">
          <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded" />
          <h2 className="font-bold mt-2">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.author}</p>
          <button
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => addToMyBooks(book._id)}
          >
            Want to Read
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;