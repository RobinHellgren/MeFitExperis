import * as React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { WorkoutAPI } from './API/WorkoutAPI';

export default function ExerciseListPage() {
    const { token } = useSelector(state => state.sessionReducer);
    let [workouts, setWorkouts] = useState(
    [
        {
            "workoutId": 0,
            "name": "",
            "type": "",
            "workoutLevel": 0,
            "workoutSets": [
                {
                    "exercise": {
                        "exerciseId": 0,
                        "name": "",
                        "description": "",
                        "targetMuscleGroup": "",
                        "image": "",
                        "vidLink": ""
                    },
                    "exerciseRepititions": 0
                }
            ],
            "programWorkouts": [
                {
                    "programId": 0,
                    "name": ""
                }
            ]
        }
    ]
    );
    useEffect(() => {
        WorkoutAPI.GetWorkouts(token)
            .then(response => setWorkouts(response))
    }, [])
    const workoutList = workouts.map((workout) =>

    );
    return (
        <>
            <h1>Workouts</h1>
        </>
    );
}