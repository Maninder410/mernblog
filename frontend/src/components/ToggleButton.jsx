import React from 'react';
import { useTheme } from './ThemeContext';

import { FiSun,FiMoon } from "react-icons/fi";
const ToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{
        position:"fixed",
        right:0,
        bottom:"600px"
    }}>
       {isDarkMode ? <FiSun style={{
        border:"none",
        height:"25px",
        width:"30px",
        backgroundColor:"white"
       }}/> : <FiMoon style={{
        border:"none",
        height:"25px",
        width:"30px",
        backgroundColor:"white"
       }}/>} 
    </button>
  );
};

export default ToggleButton;