import * as React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { ExerciseAPI } from './API/ExerciseAPI';
import { useSelector } from "react-redux"
import { Container } from '@material-ui/core';

export default function ExercisePage() {
    const { token } = useSelector(state => state.sessionReducer);
    let {exerciseId} = useParams();
    let [exercise, setExercise] = useState({
        exerciseId: 0,
        name: "",
        description: "",
        targetMuscleGroup: "",
        image: "",
        vidLink: ""
    });
    useEffect(() => {
        ExerciseAPI.getExerciseById(exerciseId,token)
            .then(response => setExercise(response))
    }, [])
    return (
        <>
            <h1>{exercise && exercise.name}</h1>
            <h3>Muscle group</h3>
            <h4>{exercise && exercise.targetMuscleGroup}</h4>
            <h3>Description</h3>
            <Container maxWidth="sm">
                <h4>{exercise && exercise.description}</h4>
            </Container>
            <img src={exercise && exercise.image} width="400" height="250"></img>
        </>
    );
}