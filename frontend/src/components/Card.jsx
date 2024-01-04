import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import server from '../index.js';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: 'auto', // Center the card horizontally
    marginTop: theme.spacing(4), // Add top margin for better spacing
    backgroundColor:"coral"
  },
  media: {
    height: 400, // Adjust the height according to your preference
    objectFit:'cover', // Ensure the image covers the entire area without distortion
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '2rem', // Increase the title font size
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  description: {
    fontSize: '1.2rem', // Increase the description font size
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionIcon: {
    fontSize: '1.5rem',
  },
}));

const BlogCard = ({ title, imageSrc = 'https://cdn.hasselblad.com/f/77891/600x600/134e6ba48b/907x_hero_front_600.jpg', description, id }) => {
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`${server}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials in the request
      });

      dispatch({ type: 'DELETE_BLOG', payload: response.data.blog });
      toast.success('Blog deleted');
    } catch (error) {
      console.error('Error deleting blog:', error.message);
    }
  };

  const editHandler = () => {
    dispatch({ type: 'EDIT_BLOG', payload: { id, title, image: 'temp', description } });
    navigate('/edit');
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={imageSrc} title={title} />
      <CardContent className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
        <div className={classes.cardActions}>
          <IconButton className={classes.actionIcon} onClick={deleteHandler}>
            <FaTrash />
          </IconButton>
          <IconButton className={classes.actionIcon} onClick={editHandler}>
            <FaEdit />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
