import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { sessionLogoutAction } from '../Store/Actions/sessionAction';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const ApplicationFrame = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const { loggedIn } = useSelector(state => state.sessionReducer);

  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(sessionLogoutAction())
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {loggedIn && 
     <div className="appFrame">{props.children}
     <AppBar position="static">
       <Toolbar>
         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
           <MenuIcon />
         </IconButton>
         <Typography variant="h6" className={classes.title}>
           MeFit
         </Typography>
         <Button href="/login" color="inherit" onClick={onLogoutClick}>Logout</Button>
       </Toolbar>
     </AppBar>
     <Menu
       id="simple-menu"
       anchorEl={anchorEl}
       keepMounted
       open={Boolean(anchorEl)}
       onClose={handleClose}
     >
        <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/dashboard" onClick={handleClose}>Dashboard</MenuItem>
       <MenuItem  component={Link} to="/login" onClick={(event) => { handleClose(event); onLogoutClick();}}>Logout</MenuItem>
     </Menu>

   </div >
      }
      {!loggedIn &&
        <div className="appFrame">{props.children}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                MeFit
              </Typography>
              <Button href="/register" color="inherit">Register</Button>
              <Button href="/login" color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
         

        </div >
      }
    </>
  );
}

export default ApplicationFrame;