import { useState, useEffect } from "react";
import { testActionFetch } from '../Store/Actions/testActions';
import { GoalAPI } from './GoalAPI';
import { useDispatch, useSelector } from "react-redux"



export default function GoalComponent() {

    const [goal, setGoal] = useState([]);
    const [wk, setWk] = useState([]);
    const { token } = useSelector(state => state.sessionReducer);


    useEffect(() => {
        getGoal(token);
    }, []);


    useEffect(() => {
        setWk(goal.goalWorkouts);
    }, [goal]);




    async function getGoal(token) {
        await GoalAPI.GetGoal(token)
            .then(response => {
                setGoal(response)})
    }



    return (
        <>
     

            <div style={{ backgroundColor: 'grey' }}>
                <h2>Goal</h2>
                <h1>GoalId: {goal.goalId}</h1>
                <p>Start Date: {goal.startDate}</p>
                <p>End Date: {goal.endDate}</p>
                <h3> The period and status of the current goal</h3>
                <h3>Workouts for the goal</h3>
                {wk && 
                <div>
                {wk.map(w => <p key={w.workoutId}>Workout Id: {w.workoutId}. Completed: {`${w.complete}`}</p>)}
                </div>
                }
                <div>
                <ul>
               
            </ul>

      
      </div>
                {/* list with status, coplete/pedning, nbutton to complete it. */}

                <h3>Achieved goals</h3>
                {/* A link to prev goals */}
            </div>
        </>
    );
}