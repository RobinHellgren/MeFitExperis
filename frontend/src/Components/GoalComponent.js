import { useState, useEffect, Profiler } from "react";
import { testActionFetch } from '../Store/Actions/testActions';
import { GoalAPI } from './API/GoalAPI';
import { useDispatch, useSelector } from "react-redux"
import { indigo } from "@material-ui/core/colors";
import { Link } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { WorkoutAPI } from "./API/WorkoutAPI";



export default function GoalComponent() {

    const [goal, setGoal] = useState([]);
    const [completedGoals, setcompletedGoals] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [tworkouts, setTWorkouts] = useState([]);
    const { token } = useSelector(state => state.sessionReducer);
    const [open, setOpen] = React.useState(false);

    async function getWorkouts() {
        var workouts = [];

        if (goal.goalWorkouts) {
            goal.goalWorkouts.forEach(async w => {
                await WorkoutAPI.GetWorkout(token, w.workoutId)
                    .then(response => {
                        response.complete = w.complete;
                        workouts.push(response);

                    })
                    .then(setWorkouts(workouts))
                    .catch(e => {
                        console.log("fail")
                    })

            })
        }

     

    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => {
       
        getGoal(token);
    }, []);

  

    useEffect(() => {
        console.log("updating !!!!!!!!")
        console.log(goal.goalWorkouts)

        if (goal.goalId) {

            GoalAPI.UpdateGoal(goal, token)
                .catch(e => {

                })

            if (goal.completed == true) {
                setGoal([])
            }

            GoalAPI.GetCompletedGoals(token)
                .then(response => {
                    setcompletedGoals(response);
                }).catch(e => {

                })
        }


    }, [goal.completed]);


    useEffect(() => {
        console.log("tryinh updating goal.goalworkouts")
        console.log(goal.goalWorkouts)
        if (goal.goalWorkouts) {
        setGoal({
            ...goal,
            goalWorkouts: workouts})
        }
        

    }, [tworkouts]);


    
    useEffect(() => {
        if (goal.goalId) {
            console.log("tryinh updating db for workout")
            console.log(goal.goalWorkouts)
            GoalAPI.UpdateGoal(goal, token)
                .catch(e => {

                })
            }

    }, [goal.goalWorkouts]);






    useEffect(() => {

        getWorkouts();
        GoalAPI.GetCompletedGoals(token)
            .then(response => {
                setcompletedGoals(response);
            }).catch(e => {

            })


    }, [goal]);



    useEffect(() => {
    }, [completedGoals]);


    let completedGoalsRender = 5;
    if (completedGoals && completedGoals.length > 0) {
        completedGoalsRender = completedGoals.map(c => {
            return <div key={c.goalId}> Goal Id: {c.goalId}</div>
        });

    } else {
        completedGoalsRender = "You have no achieved goals yet";
    }


    let workoutsRender;
    if (workouts) {
        workouts.sort((a,b) => a.workoutId - b.workoutId);
        workoutsRender = workouts.map(w => {
            return (
                <tr key={w.workoutId}>

                    <td key={w.workoutId}>
                        {w.workoutId}</td>

                    <td key={w.name}>
                        {w.name}</td>

                    <td key={w.type}>
                        {w.type}</td>
                    {w.workoutLevel&&
                    <td key={w.workoutLevel}>
                        {w.workoutLevel}</td>
        }
        {!w.workoutLevel &&
         <td key={w.workoutLevel}>
         Unknown</td>
        }
                    <td>
                        {!w.complete &&
                            <p>Uncompleted</p>}
                        {w.complete &&
                            <p>Completed</p>}

                    </td>
                    <td>
                        {!w.complete &&
                            <button id={w.workoutId}
                                onClick={() => update(w)}
                            >Complete</button>
                        }

                        {w.complete &&
                            <button class="completed" id={w.workoutId}
                                onClick={() => update(w)}
                            >Uncomplete</button>
                        }
                    </td>

                </tr>)
        })
      
    }


    async function getGoal(token) {
      
        await GoalAPI.GetGoal(token)
            .then(response => {
                setGoal(response)
                // setTmpWorkouts(response.goalWorkouts);
            }).catch(e => {

            })
    }


    function update(wi) {
      
        wi.complete = !wi.complete;
        setTWorkouts(tworkouts + 1); 
    
    };

function completeGoal() {
    handleClose();
    setGoal({
        ...goal,
        completed: true
    })
}

return (
    <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Complete goal?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you will mark current goal as completed? The goal will be moved to Achieved goals.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={completeGoal} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>

        <div>
            <h1>Current Goal</h1>
            {goal.length != 0 &&
                <div>
                    <h2>Goal Id: {goal.goalId}</h2>
                    Status:
                    <h4>Uncompleted</h4>
                    <p>Start Date: {goal.startDate.substring(0,10)}</p>
                    <p>End Date: {goal.endDate.substring(0,10)}</p>
                    <h2>Workouts for the goal</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Workout Id</th>
                                <th>Workout Name</th>
                                <th>Workout Type</th>
                                <th>Workout Level</th>
                                <th>Status</th>
                                <th>Change status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {workoutsRender}
                        </tbody>
                    </table>

                </div>
            }

            {(goal.length == 0) &&
                <div>
                    <p>You have no current goal</p>
                    <Link to="/setgoal">
                        <button href="/goals">Set Goal</button>
                    </Link>
                </div>

            }
            {(goal.length != 0) &&
                <button onClick={handleClickOpen}>Complete goal</button>
            }

            <h1>Achieved goals</h1>
            {/* A link to prev goals */}

            <div>

                {completedGoalsRender}


            </div>

        </div>
    </>
);
}