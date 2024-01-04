import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import server from "../index.js";

const EditBlog = () => {
 const [images,setImage] = useState('');
 const [titles,setTitle] = useState('');
 const [descriptions,setDescription] = useState('');
const {id,image,title,description} = useSelector(state=>state.blog);
const navigate = useNavigate();
const dispatch = useDispatch();
const {user} = useSelector(state=>state.auth);
const token =user.token;

const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    setImage(file);

  };
};


const editHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titles);
    formData.append('description', descriptions);
    formData.append('file', images);

    await axios.patch(`${server}/update/${id}`,formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',

      },
      withCredentials: true  // Include credentials in the request
    })
      .then(res => {
        toast.success("Product updated");

      })
      .catch(e => {
        toast.error(e.response.data.error);
      })
     navigate("/");
    
    dispatch({type:'CLEAR_BLOG'});

}
 useEffect(()=>{
setTitle(title);
setImage(image);
setDescription(description);
 },[title,image,description])
  return (
    <div className="edit-blog-container" style={styles.editBlogContainer}>
      <h2 style={styles.heading}>Edit Blog</h2>
      <form style={styles.form} onSubmit={editHandler}>
        <label style={styles.label}>
          title:
          <input
            type="text"
            name="name"
            value={titles}
            onChange={(e)=>setTitle(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          new Image 
          <input type="file" accept="image/*" name='file' onChange={handleImageChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}  />

        </label>
        <label style={styles.label}>
          Description:
          <textarea
            name="description"
            value={descriptions}
            onChange={(e)=>setDescription(e.target.value)}
            style={styles.textarea}
          />
        </label>
        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  editBlogContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  label: {
    marginBottom: '10px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '100px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
};

EditBlog.styles = styles;

export default EditBlog;
