import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import server from '../index.js';
import axios from 'axios';
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
    background: theme.palette.primary.main,
    color: '#fff',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      localStorage.setItem('owner', JSON.stringify(res.data));
      toast.success(`Welcome ${res.data.user.name}`);
      dispatch({ type: 'LOGIN_USER', payload: res.data });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={classes.container} style={{ background: isDarkMode ? 'rgb(14,26,37)' : '#fff', color: isDarkMode ? '#fff' : 'rgb(14,26,37)' }}>
      <Paper className={classes.form} elevation={3}>
        <Typography variant="h4" className={classes.title}>
          Login
        </Typography>
        <form onSubmit={loginHandler}>
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
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
