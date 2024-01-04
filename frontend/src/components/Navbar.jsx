import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import toast from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#333',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  navLinks: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    '&:hover': {
      textDecoration: 'underline',
      color:'coral'

    },
  },
}));

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT_USER' });
    toast.success('Logout successful');
    localStorage.removeItem('owner');
  };

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Link to="/" className={`${classes.logo} ${classes.link}`}>
          Mani Blogs
        </Link>
        <div className={classes.navLinks}>
          <Link to="/" className={classes.link}>
            <HomeIcon /> Home
          </Link>
          {!user ? (
            <>
              <Link to="/login" className={classes.link}>
                Login
              </Link>
              <Link to="/signup" className={classes.link}>
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className={classes.link}>
                <AccountCircleIcon /> Profile
              </Link>
              <IconButton
                color="inherit"
                className={classes.link}
                onClick={logoutHandler}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
