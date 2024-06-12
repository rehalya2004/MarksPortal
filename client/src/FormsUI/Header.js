import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



export default function ButtonAppBar() {
  const [anchorEl,setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () =>{
    setAnchorEl(null)
  }

  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">

        <Toolbar>

          <Menu id= "resources-menu" anchorEl={anchorEl} open={open}
            MenuListProps={{
              "aria-labelledby":"resources-button",
            }}
            onClose= {handleClose}
          >
            
            <MenuItem onClick={()=> {
              navigate("/" )
              localStorage.removeItem("token")}}
              >Logout</MenuItem>

          </Menu>       

          <IconButton 
            size="small"
            color="inherit"
            sx={{ ml: 2 }}
            id = "resources-button"
            onClick = {handleClick}
            aria-controls={open ? "resourses-menu" : undefined}
            aria-haspopup = "true"
            aria-expanded = {open ? "true" : undefined}> 

           <AccountCircleIcon fontSize='large'/>

          </IconButton>

        </Toolbar>

      </AppBar>
    </Box>
  );
}
