import { useState, useEffect, Profiler } from "react";
import { testActionFetch } from '../Store/Actions/testActions';
import { GoalAPI } from './GoalAPI';
import { useDispatch, useSelector } from "react-redux"
import { indigo } from "@material-ui/core/colors";
import { Link } from 'react-router-dom';



export default function GoalComponent() {

    const [goal, setGoal] = useState([]);
    const [completedGoals, setcompletedGoals] = useState([]);
    const [tmpWorkouts, setTmpWorkouts] = useState([]);
    const { token } = useSelector(state => state.sessionReducer);
    const { profileID } = useSelector(state => state.sessionReducer);
    const { goals } = useSelector(state => state.sessionReducer);


    useEffect(() => {
        getGoal(token);
    }, []);



    useEffect(() => {
        
        if (goals.length > 0) {
           
            GoalAPI.GetCompletedGoals(token)
                .then(response => {
                    setcompletedGoals(response);
                })
          
        }
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
                <div key={w.workoutId}>
                    Workout Id: {w.workoutId}. Completed: {`${w.complete}`}

                    {!w.complete &&
                        <button id={w.workoutId}
                            onClick={() => update(w.workoutId)}
                        >Complete</button>
                    }

                    {w.complete &&
                        <button id={w.workoutId}
                            onClick={() => update(w.workoutId)}
                        >Uncomplete</button>
                    }

                </div>)
        })

    }


    async function getGoal(token) {
        
        await GoalAPI.GetGoal(token)
            .then(response => {
                setGoal(response)
                setTmpWorkouts(response.goalWorkouts);
            })

    }

      function update (id) {
        if (tmpWorkouts && tmpWorkouts.length > 0) {

            tmpWorkouts.map(w => {
                if (w.workoutId == id) {
                    w.complete = !w.complete;
                    setTmpWorkouts()
                }})

            }
            console.log(goal)
            //TODO: update DB. waiting fo patch to work.
            //GoalAPI.UpdateGoal(goal, token, profileID);
           
        };

        return (
            <>


                <div>
                    <h1>Current Goal</h1>
                    {(goals.length > 0) &&
                        <div>
                            <h2>Goal Id: {goal.goalId}</h2>
                            Status:
                            <h4>Uncompleted</h4>
                            <p>Start Date: {goal.startDate}</p>
                            <p>End Date: {goal.endDate}</p>
                            <h2>Workouts for the goal</h2>
                            {workoutsRender}

                        </div>
                    }

                    {(goals.length == 0) &&
                        <div>
                            <p>You have no current goal</p>
                            <Link to="/setgoal">
                                <button href="/goals">Set Goal</button>
                            </Link>
                        </div>

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