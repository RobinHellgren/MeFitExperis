import * as React from 'react'
import { useState, useEffect } from 'react';
import { ExerciseAPI } from './API/ExerciseAPI';
import { useSelector } from "react-redux"
import { Container, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

//The page showing the exercises
export default function ExerciseListPage() {
    const { token } = useSelector(state => state.sessionReducer);
    let [exercises, setExercises] = useState(
        [{
            exerciseId: 0,
            name: "",
            description: "",
            targetMuscleGroup: "",
            image: "",
            vidLink: ""
        }]
    );
    useEffect(() => {
        //Gets the exercises
        ExerciseAPI.GetExercises(token)
            .then(response => setExercises(response))
    }, [])
    const exerciseList = exercises.map((exercise) =>
        <ImageListItem>
            <Link to={"/exercises/" + exercise.exerciseId}>
                <img src={exercise.image} width="300" height="auto" />

                <ImageListItemBar
                    title={exercise.name}
                    subtitle={exercise.targetMuscleGroup}
                />

            </Link>
        </ImageListItem>
    );
    return (
        <>
            <h1>Exercises</h1>
            <Container>
                <ImageList cols="4">
                    {exerciseList}
                </ImageList>
            </Container>
        </>
    );
}