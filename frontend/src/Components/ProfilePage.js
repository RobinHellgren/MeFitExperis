import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {  ProfileAPI } from './ProfileAPI';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


export default function Dashboard() {
  const { token } = useSelector(state => state.sessionReducer);
 

  const [profileState, setProfileState] = useState(false);
  const [inputState, setInputState] = useState([{
      newFirstName: "",
      newLastName:"",
      newEmail:"",
      newWeight:0,
      newHeight:0,
      newMedicalConditions:"",
      newDisabilities:"",
      newFitnessEvaluation:0
    }]);

  
  useEffect(() => {
    setProfileState(getProfileFromDatabase(token))
   }, () => {});

async function saveChangesToProfile(){
  await ProfileAPI.updateProfile(token)
  .then(getProfileFromDatabase(token));
}

  

async function getProfileFromDatabase(token) {
       await ProfileAPI.GetProfile(token)
      .then(response => {
        setProfileState(response);
      })   
  }


  return (
    <>
      <div>
      
      <h1>Profile Information</h1>
  
        <h2>First name:{profileState.firstName} </h2>
            <input type="text" onChange={(e) => setInputState(setInputState.newFirstName = e.target.value)} placeholder="Type here..."id="newFirstName"/>
        <h2>Last name:{profileState.lastName} </h2> 
            <input type="text" id="newLastName"/>
        <h2>Email:{profileState.email} </h2> 
            <input type="text" id="newEmail"/>
        <h1> Fitness Information </h1> 
        <h2>Weight:{profileState.weight} </h2> 
            <input type="text" id="newWeight"/>
        <h2>Height:{profileState.height} </h2> 
            <input type="text" id="newHeight"/>
        <h2>Medical Condition:{profileState.medicalConditions} </h2> 
            <input type="text" id="newMedicalConditions"/>
        <h2>Disabilities:{profileState.disabilities} </h2> 
            <input type="text" id="newDisabilities"/>
        <h2>Fitness evaluation:{profileState.fitnessEvaluation} </h2> 
            <input type="text" id="newFitnessEvaluation"/>
        
        <button>Edit Information</button>
        <button onClick={saveChangesToProfile}>Save Changes</button>
  
      </div>
    </>
  )
}