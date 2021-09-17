import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ProgressBar from './ProgressBar';
import {  GoalAPI } from './API/GoalAPI';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import SetGoalComponent from './SetGoalComponent';
import { Link } from 'react-router-dom'



export default function Dashboard() {
  const { token } = useSelector(state => state.sessionReducer);
  const { goals } = useSelector(state => state.sessionReducer);
 
  const [progress, setProgress] = useState("unkown");
  const [daysLeft, setDaysLeft] = useState("unkown");
  const [goal, setGoal] = useState(false);


  
  useEffect(() => {
    if(goals.length > 0) {
  
    setGoal(getGoal(token))
    }
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
      try {
       await GoalAPI.GetGoal(token)
      .then(response => {
        setGoal(response);
      })   
    } catch(error) {
      if (error = 404) {
        

      }
    }
  }


  return (
    <>
      <div>
        <h1>Dashboard</h1>

        <center> <Calendar /></center>
     
        {goal &&
         <div>
      <h2>Goal Id: {goal.goalId}</h2>
     
        <p>{daysLeft} days to achieve goal</p>
        <p>{progress} % completed</p>
        {/*<ProgressBar />*/}

        <Link to="/goals">
        <button href="/goals">See goal</button>
        </Link>

        
        </div>
}

{!goal &&
<div>
<p>You have no current goal</p>

        <Link to="/setgoal">
        <button href="/goals">Set Goal</button>
        </Link>
        </div>
}
      </div>
    </>
  )
}