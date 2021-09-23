import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { ProfileAPI } from './API/ProfileAPI';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

//The profile page
export default function ProfilePage() {
  const { token } = useSelector(state => state.sessionReducer);
  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(true);
  const [isActive4, setActive4] = useState(true);

  const tokenvalidation = parseJwt(token);

  // A function that decodes a JWT token and returns its payload
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const [profileState, setProfileState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    weight: 0,
    height: 0,
    medicalConditions: "",
    disabilities: "",
    fitnessEvaluation: 0
  });
  const setInputState = useState({
    firstName: profileState.firstName,
    lastName: "",
    email: "",
    weight: 0,
    height: 0,
    medicalConditions: "",
    disabilities: "",
    fitnessEvaluation: 0
  });


  useEffect(() => {
    setProfileState(getProfileFromDatabase(token))
  }, []);

///A function that saves the state to the database.
  async function saveChangesToProfile() {
    setActive(true);
    setActive2(false);
    setActive3(true);
    setActive4(true);
    document.getElementById("1").disabled = true;
    document.getElementById("2").disabled = true;
    document.getElementById("3").disabled = true;
    document.getElementById("4").disabled = true;
    document.getElementById("5").disabled = true;
    document.getElementById("6").disabled = true;
    document.getElementById("7").disabled = true;
    document.getElementById("8").disabled = true;
    if (setInputState.firstName === undefined || setInputState.firstName === null || setInputState.firstName === "") {
      setInputState.firstName = profileState.firstName;
    }
    if (setInputState.lastName === undefined || setInputState.lastName === null || setInputState.lastName === "") {
      setInputState.lastName = profileState.lastName;
    }
    if (setInputState.email === undefined || setInputState.email === null || setInputState.email === "") {
      setInputState.email = profileState.email;
    }
    if (setInputState.weight === undefined || setInputState.weight === null || setInputState.weight === "") {
      setInputState.weight = profileState.weight;
    }
    if (setInputState.height === undefined || setInputState.height === null || setInputState.height === "") {
      setInputState.height = profileState.height;
    }
    if (setInputState.medicalConditions === undefined || setInputState.medicalConditions === null || setInputState.medicalConditions === "") {
      setInputState.medicalConditions = profileState.medicalConditions;
    }
    if (setInputState.disabilities === undefined || setInputState.disabilities === null || setInputState.disabilities === "") {
      setInputState.disabilities = profileState.disabilities;
    }
    if (setInputState.fitnessEvaluation === undefined || setInputState.fitnessEvaluation === null || setInputState.fitnessEvaluation === "") {
      setInputState.fitnessEvaluation = profileState.fitnessEvaluation;
    }
    await ProfileAPI.updateProfile(token,
      setInputState.firstName,
      setInputState.lastName,
      setInputState.email,
      setInputState.weight,
      setInputState.height,
      setInputState.medicalConditions,
      setInputState.disabilities,
      setInputState.fitnessEvaluation,
      tokenvalidation.sub
    ).then(response => {
      setProfileState(response)
    })

  }

  
// This function switches the input boxes to not be diabled - which enables the user to edit their information.
  function showInputBoxes() {
    setInputState.firstName = profileState.firstName;
    setInputState.lastName = profileState.lastName;
    setInputState.email = profileState.email;
    setInputState.weight = profileState.weight;
    setInputState.height = profileState.height;
    setInputState.medicalConditions = profileState.medicalConditions;
    setInputState.disabilities = profileState.disabilities;
    setInputState.fitnessEvaluation = profileState.fitnessEvaluation;
    document.getElementById("1").disabled = false;
    document.getElementById("2").disabled = false;
    document.getElementById("3").disabled = false;
    document.getElementById("4").disabled = false;
    document.getElementById("5").disabled = false;
    document.getElementById("6").disabled = false;
    document.getElementById("7").disabled = false;
    document.getElementById("8").disabled = false;
    setActive(false);
    setActive2(true);
  }
// Gets the profile from the database and sets the state.
  async function getProfileFromDatabase(token) {
    await ProfileAPI.GetProfile(token)
      .then(response => {
        setProfileState(response);
      })
  }
//Input validation check for the inputs that only wants letters.
  function check(checkvalue, valuename) {
    var regex = /^[a-zA-Z]*$/;
    if (regex.test(checkvalue)) {
      setActive3(true);
      document.getElementById("submitbutton").disabled = false;
      document.getElementById("submitbutton").style.opacity = 1;
      setInputState.valuename = checkvalue;
    }
    else {
      document.getElementById("submitbutton").disabled = true;
      document.getElementById("submitbutton").style.opacity = 0.5;
      setActive3(false);
    }
  }
// Input validation check for the email input to be in the right format. 
  function checkEmail(checkvalue) {
    if (checkvalue.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)) {
      setActive4(true);
      document.getElementById("submitbutton").disabled = false;
      document.getElementById("submitbutton").style.opacity = 1;
      setInputState.email = checkvalue;
    }
    else {
      document.getElementById("submitbutton").disabled = true;
      document.getElementById("submitbutton").style.opacity = 0.5;
      setActive4(false);
    }
  }

  return (
    <>
      <div style={{marginTop:"70px" }}>
        <div className="container-box">
          <Typography style={{marginBottom:"-10px"}} component="p" variant="p">
              First name:
            </Typography>
          <TextField
            style={{marginTop:"0px"}}
            margin="normal"
            fullWidth
            id="1"
            name="firstName"
            label={profileState.firstName}
            disabled="true"
            autoFocus
            onChange={(e) => check(e.target.value, e.target.name)}
          />
          <Typography style={{marginBottom:"-10px"}} component="p" variant="p">
              Last name:
            </Typography>
          <TextField
          style={{marginTop:"0px"}}
            margin="normal"
            fullWidth
            id="2"
            name="lastName"
            label={profileState.lastName}
            disabled="true"
            autoFocus
            onChange={(e) => check(e.target.value, e.target.name)}
          />
          <Typography style={{marginBottom:"-10px"}} component="p" variant="p">
             Email:
            </Typography>
          <TextField
            style={{marginTop:"0px"}}
            margin="normal"
            fullWidth
            id="3"
            name="email"
            label={profileState.email}
            disabled="true"
            autoFocus
            onChange={(e) => checkEmail(e.target.value)}
          />
        
        
        
       <Typography style={{marginBottom:"10px", marginTop:"40px"}} component="p" variant="p">
              Fitness Level
            </Typography>
          <input placeholder={profileState.fitnessEvaluation} id="4" disabled="true" type="number" onChange={(e) => setInputState.fitnessEvaluation = e.target.value} /> 
          <Typography style={{marginBottom:"10px",marginTop:"20px"}} component="p" variant="p">
              Height:
        </Typography> 
            <input placeholder={profileState.height+"cm"} id="6" disabled="true" type="number" onChange={(e) => setInputState.height = e.target.value} />
            <Typography style={{marginBottom:"10px",marginTop:"20px"}} component="p" variant="p">
              Weight:
        </Typography> 
            <input placeholder={profileState.weight+"kg"} id="5" disabled="true" type="number" onChange={(e) => setInputState.weight = e.target.value} />
          
            <Typography style={{marginTop:"30px"}} component="p" variant="p">
              Medical Conditions
              </Typography> 
          <TextField
            margin="normal"
            style={{marginBottom:"0px"}}
            label={profileState.medicalConditions}
            id="7"
            name="medicalConditions"
            disabled="true"
            autoFocus
            onChange={(e) => check(e.target.value, e.target.name)}
          />
          <Typography style={{marginTop:"30px"}} component="p" variant="p">
              Disabilities:
              </Typography> 
          <TextField
          style={{marginTop:"0px"}}
            margin="normal"
            id="8"
            name="disabilities"
            label={profileState.disabilities}
            disabled="true"
            autoFocus
            onChange={(e) => check(e.target.value, e.target.name)}
          />
        </div>
        <div>
          <button className={isActive2 ? 'profileInputBox' : null} onClick={showInputBoxes}>Edit Information</button>
          <button id="submitbutton" className={isActive ? 'profileInputBox' : null} onClick={saveChangesToProfile}>Save Changes</button>
          <p className={isActive3 ? 'profileInputBox' : null}>It has to only contain letters.</p>
          <p className={isActive4 ? 'profileInputBox' : null}>It has to be an email address.</p>
        </div>
        </div>
    </>
  );

} 
