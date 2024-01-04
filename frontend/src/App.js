import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbars from "./components/Navbar";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";
import "./app.css";
import CreateBlog from "./components/CreateBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import ToggleButton from "./components/ToggleButton.jsx";
function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
  const me = localStorage.getItem("owner");
 
if(me){
  const owner = JSON.parse(localStorage.getItem("owner"));
  dispatch({type:'LOGIN_USER',payload:owner});
}

},[dispatch])
  const {user} =useSelector(state=>state.auth);

  return (
    <ThemeProvider>
    <BrowserRouter>
<ToggleButton />

      <Navbars/>
    
      <Routes>
        <Route path="/" element={user?<Home/>:<Login/>}></Route>
        <Route path="/login" element={!user?<Login/>:<Home/>}></Route>
        <Route path="/signup" element={!user?<Signup/>:<Home/>}></Route>
        <Route path="/profile" element={user ?<Profile/>:<Login/>}></Route>
        <Route path="/create" element={user?<CreateBlog/>:<Login/>}></Route>
        <Route path="/edit" element={user?<EditBlog/>:<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
