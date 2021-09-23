import * as React from 'react'
import { useState, useEffect } from 'react';
import { WorkoutAPI } from './API/WorkoutAPI';
import { useSelector } from "react-redux"
import { Container, ImageList, ImageListItem, ImageListItemBar} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

export default function ExerciseListPage() {
    const { token } = useSelector(state => state.sessionReducer);
    const {workoutId} = useParams();
    let [workout, setWorkout] = useState(
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
    );
    useEffect(() => {
        WorkoutAPI.GetWorkout(token,workoutId)
            .then(response => setWorkout(response))
    }, [])
    const exerciseList = workout.workoutSets.map((exercise) =>
        <ImageListItem>
            <img src={exercise.exercise.image} width = "300" height = "250"/>
            <Link to={"/exercises/"+ exercise.exercise.exerciseId}>
                <ImageListItemBar
                    title={exercise.exercise.name}
                    subtitle={exercise.exercise.targetMuscleGroup}
                />
                
            </Link>
        </ImageListItem>
    );
    return (
        <>
            <h1>{workout.name}</h1>
            <h3>Type</h3>
            <h4>{workout.type}</h4>
            <h3>Workout Level</h3>
            <h4>{workout.workoutLevel}</h4>
            <h3>Exercises</h3>
            <Container>
                <ImageList cols={2}>
                    {exerciseList}
                </ImageList>
            </Container>
        </>
    );
}