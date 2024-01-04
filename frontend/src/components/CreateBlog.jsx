// CreateBlog.js

import server from "../index.js";
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader.jsx';


const CreateBlog = () => {
  const {user} = useSelector(state=>state.auth);
const token =user.token;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (e) => {
    // const selectedImage = event.target.files[0];
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(file);

    };
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', image);
    
    await axios.post(`${server}/create`, 
    formData
    , {
      headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',

      },
      withCredentials: true  // Include credentials in the request
    })
      .then(response => {
        // Handle the response
        setLoading(false);
        toast.success("blog created");
        navigate("/");

      
      })
      .catch(error => {
        // Handle errors
        setLoading(false);

        if (error.response && error.response.data) {
          toast.error(error.response.data.error || 'An error occurred');
        } else {
          toast.error('An error occurred');
        }
      
        
      });
    

  };

  return (
    
      loading ?<Loader/>:

      <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Image:
          <input type="file" accept="image/*" name='file' onChange={handleImageChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} >submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
