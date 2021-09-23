import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ProgressBar from './ProgressBar';
import { GoalAPI } from './API/GoalAPI';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'


//The page showing the dashboard
export default function Dashboard() {
  const { token } = useSelector(state => state.sessionReducer);
  const { goals } = useSelector(state => state.sessionReducer);

  const [progress, setProgress] = useState("unkown");
  const [daysLeft, setDaysLeft] = useState("unkown");
  const [goal, setGoal] = useState(false);



  useEffect(() => {
    if (goals.length > 0) {
      setGoal(getGoal(token))
    }
  }, []);


  useEffect(() => {
    if (goal.goalId != undefined) {
      calcDaysLeft();
      calcProgress();

    }
  }, [goal]);

  //Calculates the goal progress based on completed and uncompleted workouts and sets the progrss state to it
  function calcProgress() {
    var completed = null;
    var total = goal.goalWorkouts.length;

    if (total > 0) {
      for (const workout of goal.goalWorkouts) {
        if (workout.complete) {
          completed++;
        }
      }
      setProgress(Math.round(completed / total * 100));
    } else {
      setProgress(0);
    }

  }

  //Calculates the days left to achieve the goal based on the goal's enddate and sets the daysleft state to it
  function calcDaysLeft() {
    var date = new Date();
    var diff = Math.floor((Date.parse(goal.endDate) - Date.parse(date)) / 86400000);
    if (diff < 0) setDaysLeft(0)
    else setDaysLeft(1 + diff);
  }

  //Gets the users goal and sets the goal state to it
  async function getGoal(token) {
    try {
      await GoalAPI.GetGoal(token)
        .then(response => {
          setGoal(response);
        })
    } catch (error) {
      if (error == 404) {

      }
    }

  }


  return (
    <>
      <div>
        <h1>Dashboard</h1>

        <center> <Calendar /></center>

        {goal.goalId &&
          <div>
            <h2>Current Goal</h2>
            <h3>Goal: {goal.goalId}</h3>

            <p>You have <b>{daysLeft}</b> days to achieve your goal</p>
            <p>The goal is <b>{progress} %</b> completed</p>
            {/*<ProgressBar />*/}

            <Link to="/goals">
              <button href="/goals">See goal</button>
            </Link>

          </div>
        }

        {!goal.goalId > 0 &&
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