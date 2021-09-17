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



export default function GoalComponent() {

    const [goal, setGoal] = useState([]);
    const [completedGoals, setcompletedGoals] = useState([]);
    const [tmpWorkouts, setTmpWorkouts] = useState([]);
    const { token } = useSelector(state => state.sessionReducer);
    const [open, setOpen] = React.useState(false);


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


        GoalAPI.GetCompletedGoals(token)
            .then(response => {
                setcompletedGoals(response);
            }).catch(e => {

            })


    }, [goal]);



    useEffect(() => {
        setTmpWorkouts(goal.goalWorkouts)
    }, [tmpWorkouts]);


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
    if (goal && goal.goalWorkouts) {

        workoutsRender = goal.goalWorkouts.map(w => {
            return (
                <tr>

                    <td key={w.workoutId}>
                        {w.workoutId}</td>

                    <td>
                        {!w.complete &&
                            <p>Uncompleted</p>}
                        {w.complete &&
                            <p>Completed</p>}

                    </td>
                    <td>
                        {!w.complete &&
                            <button id={w.workoutId}
                                onClick={() => update(w.workoutId)}
                            >Complete</button>
                        }

                        {w.complete &&
                            <button class="completed" id={w.workoutId}
                                onClick={() => update(w.workoutId)}
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
                setTmpWorkouts(response.goalWorkouts);
            }).catch(e => {

            })
    }

    function update(id) {
        if (tmpWorkouts && tmpWorkouts.length > 0) {

            tmpWorkouts.map(w => {
                if (w.workoutId == id) {
                    w.complete = !w.complete;
                    setTmpWorkouts()
                }
            })

        }
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
                        <p>Start Date: {goal.startDate}</p>
                        <p>End Date: {goal.endDate}</p>
                        <h2>Workouts for the goal</h2>
                        <table>
                            <tr>
                                <th>Workout Id</th>
                                <th>Status</th>
                                <th>Change status</th>
                            </tr>




                            {workoutsRender}
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