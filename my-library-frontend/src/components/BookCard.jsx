import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookCard = ({ book }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!user) {
      alert('Please login to add books');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/api/mybooks/${book._id}`, {}, { withCredentials: true });
      alert('Book added to My Books');
    } catch (err) {
      alert('Could not add book');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
      <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={handleAdd} style={{ padding: '8px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
        Want to Read
      </button>
    </div>
  );
};

export default BookCard;