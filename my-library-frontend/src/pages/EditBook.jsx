// src/pages/EditBook.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../api/bookApi';

const EditBook = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', author: '', coverImage: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(id).then((res) => {
      const { title, author, coverImage } = res.data;
      setFormData({ title, author, coverImage });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, formData);
      alert('Book updated successfully');
      navigate('/');
    } catch (err) {
      alert('Failed to update or not authorized');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border px-2 py-1" required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="w-full border px-2 py-1" required />
        <input type="text" name="coverImage" placeholder="Cover Image URL" value={formData.coverImage} onChange={handleChange} className="w-full border px-2 py-1" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;