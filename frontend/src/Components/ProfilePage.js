import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {  ProfileAPI } from './ProfileAPI';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"


export default function ProfilePage() {
  const { token } = useSelector(state => state.sessionReducer);
  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(false);

  const tokenvalidation =parseJwt(token);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


  const [profileState, setProfileState] = useState({
      firstName: "",
      lastName:"",
      email:"",
      weight:0,
      height:0,
      medicalConditions:"",
      disabilities:"",
      fitnessEvaluation:0
    });
  const setInputState = useState({
      firstName: profileState.firstName,
      lastName:"",
      email:"",
      weight:0,
      height:0,
      medicalConditions:"",
      disabilities:"",
      fitnessEvaluation:0
    });

  
  useEffect(() => {
    setProfileState(getProfileFromDatabase(token))
   },[]);

async function saveChangesToProfile(){
  setActive(!isActive);
  setActive2(isActive);
  if(setInputState.firstName===undefined || setInputState.firstName===null || setInputState.firstName===""){
    setInputState.firstName=profileState.firstName;
  }
  if(setInputState.lastName===undefined || setInputState.lastName===null || setInputState.lastName===""){
    setInputState.lastName=profileState.lastName;
  }
  if(setInputState.email===undefined || setInputState.email===null || setInputState.email===""){
    setInputState.email=profileState.email;
  }
  if(setInputState.weight===undefined || setInputState.weight===null || setInputState.weight===""){
    setInputState.weight=profileState.weight;
  }
  if(setInputState.height===undefined || setInputState.height===null || setInputState.height===""){
    setInputState.height=profileState.height;
  }
  if(setInputState.medicalConditions===undefined || setInputState.medicalConditions===null || setInputState.medicalConditions===""){
    setInputState.medicalConditions=profileState.medicalConditions;
  }
  if(setInputState.disabilities===undefined || setInputState.disabilities===null || setInputState.disabilities===""){
    setInputState.disabilities=profileState.disabilities;
  }
  if(setInputState.fitnessEvaluation===undefined || setInputState.fitnessEvaluation===null || setInputState.fitnessEvaluation===""){
    setInputState.fitnessEvaluation=profileState.fitnessEvaluation;
  }
  console.log(setInputState.firstName);
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

function showInputBoxes(){
  setInputState.firstName = profileState.firstName;
  setInputState.lastName = profileState.lastName;
  setInputState.email = profileState.email;
  setInputState.weight = profileState.weight;
  setInputState.height = profileState.height;
  setInputState.medicalConditions = profileState.medicalConditions;
  setInputState.disabilities = profileState.disabilities;
  setInputState.fitnessEvaluation = profileState.fitnessEvaluation;
  setActive(!isActive);
  setActive2(isActive);
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
            <input className={isActive ? 'profileInputBox': null}  type="text" onChange={(e) => setInputState.firstName = e.target.value}/>
        <h2>Last name:{profileState.lastName} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.lastName = e.target.value}/>
        <h2>Email:{profileState.email} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.email = e.target.value}/>
        <h1> Fitness Information </h1> 
        <h2>Weight:{profileState.weight} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.weight = e.target.value}/>
        <h2>Height:{profileState.height} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.height = e.target.value}/>
        <h2>Medical Condition:{profileState.medicalConditions} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.medicalConditions = e.target.value}/>
        <h2>Disabilities:{profileState.disabilities} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.disabilities = e.target.value}/>
        <h2>Fitness evaluation:{profileState.fitnessEvaluation} </h2> 
            <input className={isActive ? 'profileInputBox': null} type="text" onChange={(e) => setInputState.fitnessEvaluation = e.target.value}/>
        
        <button className={isActive2 ? 'profileInputBox': null} onClick={showInputBoxes}>Edit Information</button>
        <button className={isActive ? 'profileInputBox': null} onClick={saveChangesToProfile}>Save Changes</button>
  
      </div>
    </>
  )

}