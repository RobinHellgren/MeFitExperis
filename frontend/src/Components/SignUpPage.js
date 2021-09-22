import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { registrationAttemptAction } from '../Store/Actions/registrationAction';
import { Redirect } from 'react-router';
import { SettingsBluetoothSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(true);
  const [isActive3, setActive3] = useState(true);

  const [user, setUser] = useState({
    username: '',
    email: '',
    lastname: '',
    firstname: '',
    password: '',
    confirmpassword: ''
  })

  const dispatch = useDispatch();


  const { loggedIn } = useSelector(state => state.sessionReducer);

  const { registrationError, registrationAttempting } = useSelector(state => state.registrationReducer);

  const onRegisterSubmit = event => {
    event.preventDefault();
    dispatch(registrationAttemptAction(user));
  }

  const onInputChange = event => {
    if(event.target.name==="email"){
      checkEmail(event.target.value);
    }
    if(event.target.id==="password" || event.target.id==="confirmpassword"){
      if(setUser.password===setUser.confirmpassword){
        setActive3(true);
        document.getElementById("submitbutton").disabled = false;
        document.getElementById("submitbutton").style.opacity = 1;
        return;
      }
      else{
        document.getElementById("submitbutton").disabled = true;
        document.getElementById("submitbutton").style.opacity = 0.5;
        setActive3(false);
      }
    }
    else {
      check(event.target.value);
    }
    setUser({
      ...user,
      [event.target.id]: event.target.value
    })
  }

  function check(checkvalue) {
    var regex = /^[a-zA-Z]*$/;
    if(regex.test(checkvalue)){
      setActive(true);
      document.getElementById("submitbutton").disabled = false;
      document.getElementById("submitbutton").style.opacity = 1;
    }
    else {
      document.getElementById("submitbutton").disabled = true;
      document.getElementById("submitbutton").style.opacity = 0.5;
      setActive(false);
    }
  }
  function checkEmail(checkvalue){
    if (checkvalue.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)){
    setActive2(true);
    document.getElementById("submitbutton").disabled = false;
    document.getElementById("submitbutton").style.opacity = 1;
    }
    else {
      document.getElementById("submitbutton").disabled = true;
      document.getElementById("submitbutton").style.opacity = 0.5;
      setActive2(false);
    }
  }
  return (
    <>
      {loggedIn && <Redirect to="/dashboard" />}
      {!loggedIn &&

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={onRegisterSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lname"
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="uname"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    onChange={onInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                id="submitbutton"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
            <p className={isActive ? 'profileInputBox': null}>It has to only contain letters.</p>
            <p className={isActive2 ? 'profileInputBox': null}>It has to be an email address.</p>
            <p className={isActive3 ? 'profileInputBox': null}>The passwords have to match.</p>
            {registrationAttempting &&

              <div>
                <p>"Trying to login..."</p>

              </div>
            }

            {registrationError &&
              <div>
                <p> {registrationError}</p>
              </div>
            }
          </div>
        </Container>
      }
    </>

  );
}
