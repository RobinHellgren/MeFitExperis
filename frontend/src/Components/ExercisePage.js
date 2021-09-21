import * as React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getExercise } from './ExerciseAPI';

export default function ExercisePage() {
    let {exerciseId} = useLocation();
    let exercise, setExercise = useState({
        exerciseId: 0,
        name: "",
        description: "",
        targetMuscleGroup: "",
        image: "",
        vidLink: ""
    });
    useEffect(() => {
        setExercise(getExercise(exerciseId))
    }, [])
    return (
        <>
            <h1>Exercise</h1>
            <h2>{exercise.name}</h2>
            <h2>{exercise.description}</h2>
            <img src={exercise.image}></img>
        </>
    );
}