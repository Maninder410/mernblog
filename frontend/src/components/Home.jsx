import React, { useEffect, useState} from 'react'
import Card from './Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import server from "../index.js";
import toast from 'react-hot-toast';
import Loader from './Loader.jsx';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from './ThemeContext';
const useStyles = makeStyles((theme) => ({
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(1, 2),
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    textDecoration: 'none',
    borderRadius: theme.shape.borderRadius,
  },
  addButton: {
    marginRight: theme.spacing(1),
  },
}));

const Home = () => {
const dispatch = useDispatch();
const {blogs} = useSelector(state=>state.blog);
const {user} = useSelector(state=>state.auth);
const [loading,setLoading] = useState(true);
const token =user.token;
const classes = useStyles();
const { isDarkMode } = useTheme();

useEffect(()=>{
        const getBlogs = async ()=>{
          await axios.get(`${server}/get`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true  // Include credentials in the request
          })
            .then(response => {
              const Data = response.data;
              dispatch({ type: 'GET_BLOGS', payload: Data.blogs });
              setLoading(false);
            })
            .catch(error => {
              toast.error(error.response);
            });
          
        }
        getBlogs();
},[dispatch,token])

  return (
    loading?<Loader/>:
    <div style={{ background: isDarkMode ? 'rgb(14,26,37)' : '#fff', color: isDarkMode ? '#fff' : 'rgb(14,26,37)',minHeight:'100vh' }}>
        <div className={classes.linkContainer}>
      <Link to="/create" className={classes.linkButton}>
        <AddIcon className={classes.addButton} />
        Create A Blog
      </Link>
    </div>
        {blogs && blogs.map((item)=>(
            <Card key={item._id} title={item.title} imageSrc={item.image} description = {item.description} id={item._id} />
        ))
        }
    </div>
  )
}

export default Home