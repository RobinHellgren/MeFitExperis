import React from 'react';
import { useState, useEffect } from 'react';
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
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const { loggedIn } = useSelector(state => state.sessionReducer);
  const { username } = useSelector(state => state.sessionReducer);
  const [backButton, setBackButton] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    if (window.location.pathname.includes("exercises/") || window.location.pathname.includes("workouts/") || window.location.pathname.includes("programs/")) {
      setBackButton(true);
    } else {
      setBackButton(false);
    };

  }, []);


  useEffect(() => {

  }, [backButton]);


  //Logs out the user
  const onLogoutClick = () => {
    dispatch(sessionLogoutAction())
  }

  //Opens the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Closes the mneu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Redirects to prev. page
  const handleBackClick = () => {
    history.goBack();
  }



  return (
    <>
      {loggedIn &&
        <div className="appFrame">{props.children}
          <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              {backButton &&
                <Button color="inherit" onClick={handleBackClick}> <ArrowBackIcon /></Button>
              }
              {!backButton &&
                <Button color="inherit"></Button>
              }
              <Typography variant="h6" className={classes.title} style={{ marginRight: '-30px' }}>
                MeFit
              </Typography>
              <Button href="/profile" color="inherit"><PersonIcon />{username}</Button>
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
            <MenuItem component={Link} to="/goals" onClick={handleClose}>Goals</MenuItem>
            <MenuItem component={Link} to="/exercises" onClick={handleClose}>Exercises</MenuItem>
            <MenuItem component={Link} to="/workouts" onClick={handleClose}>Workouts</MenuItem>
            <MenuItem component={Link} to="/programs" onClick={handleClose}>Programs</MenuItem>
            <MenuItem component={Link} to="/login" onClick={(event) => { handleClose(event); onLogoutClick(); }}>Logout</MenuItem>
          </Menu>

        </div >
      }
      {!loggedIn &&
        <div className="appFrame">{props.children}
          <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>

              <Typography variant="h6" className={classes.title} style={{ marginRight: '-150px' }}>
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