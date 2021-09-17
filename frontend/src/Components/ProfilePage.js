import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {  ProfileAPI } from './ProfileAPI';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


export default function Dashboard() {
  const { token } = useSelector(state => state.sessionReducer);
 

  const [profileState, setProfileState] = useState(false);


  
  useEffect(() => {
    setProfileState(getProfile(token))
   }, () => {});



  

async function getProfile(token) {
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
      <h2>Last name:{profileState.lastName} </h2>
      <h2>Email:{profileState.email} </h2>
      <h1> Fitness Information </h1>
      <h2>Weight:{profileState.weight} </h2>
      <h2>Height:{profileState.height} </h2>
      <h2>Medical Condition:{profileState.medicalConditions} </h2>
      <h2>Disabilities:{profileState.disabilities} </h2>
      <h2>Fitness evaluation:{profileState.fitnessEvaluation} </h2>
      <ul>Goals:{profileState.goals} </ul>
      </div>
    </>
  )
}