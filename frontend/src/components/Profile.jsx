import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from './ThemeContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    height: '70vh',
    width: '30vw',
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileName: {
    margin: '0',
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  email: {
    margin: '0',
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [photo, setPhoto] = useState('photo');
  const {isDarkMode} = useTheme();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('owner'));
    setName(data.user.name);
    setEmail(data.user.email);
    setPhoto(data.user.photo);
  }, []);

  return (
    <div >

    <Paper className={classes.container} style={{ background: isDarkMode ? 'rgb(14,26,37)' : '#fff', color: isDarkMode ? '#fff' : 'rgb(14,26,37)' }}>
      <img src={photo} alt="Profile" className={classes.image} />
      <div className={classes.info}>
        <Typography variant="h4" className={classes.profileName} style={{color:(isDarkMode?"white":"black")}}>
          {name}
        </Typography>
        <Typography variant="body1" className={classes.email} style={{color:(isDarkMode?"white":"black")}}>
          {email}
        </Typography>
      </div>
    </Paper>
    </div>

  );
};

export default Profile;