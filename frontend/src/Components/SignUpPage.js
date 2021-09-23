import React, { useState, useEffect } from 'react';
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

//The sign up page
export default function SignUp() {
  const classes = useStyles();

  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(true);
  const [isActive3, setActive3] = useState(true);
  const [isActive4, setActive4] = useState(true);
  const [isActive5, setActive5] = useState(false);

  const [userInput, setInput] = useState({
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

  //Treis to register the user
  const onRegisterSubmit = event => {
    event.preventDefault();
    dispatch(registrationAttemptAction(userInput));
  }

  useEffect(() => {
    checkFirstName();
    submitCheck();
  }, [userInput.firstname]);
  useEffect(() => {
    checkLastName();
    submitCheck();
  }, [userInput.lastname]);
  useEffect(() => {
    checkUsername();
    submitCheck();
  }, [userInput.username]);
  useEffect(() => {
    checkEmail();
    submitCheck();
  }, [userInput.email]);
  useEffect(() => {
    checkPassword();
    submitCheck();
  }, [userInput.password]);
  useEffect(() => {
    checkConfirmPassword();
    submitCheck();
  }, [userInput.confirmpassword]);

  // Function that makes a check on all input fields and ultimately sets the submit button to disabled or not disabled.
  function submitCheck() {
    var regex = /^[a-zA-Z]*$/;
    var regex2 = /^[a-zA-Z0-9]*$/;
    if (regex.test(userInput.firstname) && regex.test(userInput.lastname)
      && userInput.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) && regex2.test(userInput.username)
      && userInput.confirmpassword === userInput.password && userInput.confirmpassword !== "" && userInput.password !== ""
      && userInput.firstname !== "" && userInput.lastname !== "" && userInput.username !== "") {
      document.getElementById("submitbutton").disabled = false;
      document.getElementById("submitbutton").style.opacity = 1;
      }
    }
  // A validation check for the firstName input - sets its help text
  function checkFirstName() {
    var regex = /^[a-zA-Z]*$/;
    if (regex.test(userInput.firstname)) {
      setActive(true);
    }
    else {
      setActive(false);
    }
  }
  // A validation check for the lastName input - sets its help text
  function checkLastName() {
    var regex = /^[a-zA-Z]*$/;
    if (regex.test(userInput.lastname)) {
      setActive2(true);
    }
    else {
      setActive2(false);
    }
  }
  // A validation check for the email input - sets its help text
  function checkEmail() {
    if (userInput.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)) {
      setActive3(true);
    }
    else {
      setActive3(false);
    }
  }
  // A validation check for the userName input - sets its help text
  function checkUsername() {
    var regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(userInput.username)) {
      setActive4(true);
    }
    else {
      setActive4(false);
    }
  }
  // A validation check for the password input - sets its help text
  function checkPassword() {
    if (userInput.confirmpassword === userInput.password) {
      setActive5(true);
    }
    else {
      setActive5(false);
    }
  }
  // A validation check for the password input - sets its help text
  function checkConfirmPassword() {
    if (userInput.confirmpassword === userInput.password) {
      setActive5(true);
    }
    else {
      setActive5(false);
    }
  }
 //Checks what input fields was changed and then sets that state to the input - then sends it to the corresponding input check.
  function setvalue(value, name) {
    if (name === "firstname") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkFirstName();
    }
    if (name === "lastname") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkLastName();
    }
    if (name === "email") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkEmail();
    }
    if (name === "username") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkUsername();
    }
    if (name === "password") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkPassword();
    }
    if (name === "confirmpassword") {
      setInput({
        ...userInput,
        [name]: value
      });
      checkConfirmPassword();
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
                  />
                  <p className={isActive ? 'profileInputBox' : null}>Only letters.</p>
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
                  />
                  <p className={isActive2 ? 'profileInputBox' : null}>Only letters.</p>
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
                  />
                  <p className={isActive3 ? 'profileInputBox' : null}>Has to be an email address.</p>
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
                  />
                  <p className={isActive4 ? 'profileInputBox' : null}>Only letters or numbers.</p>
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
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
                    onChange={(e) => setvalue(e.target.value, e.target.name)}
                  />
                  <p className={isActive5 ? 'profileInputBox' : null}>The passwords must match.</p>
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
