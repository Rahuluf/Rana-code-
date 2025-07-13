import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', formData, { withCredentials: true });
      navigate('/');
    } catch (err) {
      alert('Error adding book');
    }
  };

  if (!user) return <p>Please login to add a book.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border px-2 py-1" required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="w-full border px-2 py-1" required />
        <input type="text" name="coverImage" placeholder="Cover Image URL" value={formData.coverImage} onChange={handleChange} className="w-full border px-2 py-1" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;