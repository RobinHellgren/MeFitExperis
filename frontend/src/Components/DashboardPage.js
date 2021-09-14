import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ProgressBar from './ProgressBar';
import {  GoalAPI } from './GoalAPI';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


export default function Dashboard() {
  const { token } = useSelector(state => state.sessionReducer);
 
  const [progress, setProgress] = useState("unkown");
  const [daysLeft, setDaysLeft] = useState("unkown");
  const [goal, setGoal] = useState(false);


  
  useEffect(() => {
    setGoal(getGoal(token))
   }, () => { console.log("setState completed", goal) });


   useEffect(() => {

    if(goal.goalId != undefined) {
    calcDaysLeft();
    calcProgress();
    }
   }, [goal]);



  function calcProgress() {
    var completed = null;
  
    var total = goal.goalWorkouts.length;

    if(total > 0) {
    for (const workout of goal.goalWorkouts) {
      if (workout.complete) {
        completed++;
      }
    }
  }

  
     setProgress(completed / total * 100);

  }

  function calcDaysLeft() {
    var date = new Date();
    var diff = Math.floor((Date.parse(goal.endDate) - Date.parse(date)) / 86400000);
    if(diff < 0 ) setDaysLeft(0)
    else setDaysLeft(diff);
  }

async function getGoal(token) {
       await GoalAPI.GetGoal(token)
      .then(response => {
        setGoal(response);
      })   
  }


  return (
    <>
      <div>
        <h1>Dashboard</h1>

        <center> <Calendar /></center>
      <div>
      <h1>GoalId: {goal.goalId}</h1>
      </div>
        <p>{daysLeft} days to achieve goal</p>
        <p>{progress} % completed</p>
        {/*<ProgressBar />*/}
        <h2><button>Set goals for the week</button></h2>
      </div>
    </>
  )
}