import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import server from '../index.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useTheme } from './ThemeContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    width: '400px',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: '#28a745',
    color: '#fff',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();
const {isDarkMode} = useTheme();
  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPhoto(file);
    };
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', photo);

    try {
      const res = await axios.post(`${server}/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast.success('Signup success');

      const userData = res.data.user;
      const token = res.data.token;

      localStorage.setItem('owner', JSON.stringify(res.data));
      dispatch({ type: 'LOGIN_USER', payload: { name: userData.name, token } });
    } catch (error) {
      toast.error(error.response.data.error);
    }

    setPhoto('');
  };

  return (
    <div className={classes.container} style={{ background: isDarkMode ? 'rgb(14,26,37)' : '#fff', color: isDarkMode ? '#fff' : 'rgb(14,26,37)' }}>
      <Paper className={classes.form} elevation={3}>
        <Typography variant="h4" className={classes.title}>
          Signup
        </Typography>
        <form onSubmit={signupHandler} encType="multipart/form-data">
          <div className={classes.formGroup}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
            />
          </div>
          <label style={{ display: 'block' }}>
            Profile Picture:
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={photoHandler}
              style={{ width: '100%',  boxSizing: 'border-box' }}
            />
          </label>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
