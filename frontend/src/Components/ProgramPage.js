import * as React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { ProgramAPI } from './API/ProgramAPI';
import { useSelector } from "react-redux"
import { ListItem, ListItemText, Divider, List, Container } from '@material-ui/core';

//The page showing one program
export default function ProgramPage() {
    const { token } = useSelector(state => state.sessionReducer);
    let { programId } = useParams();
    let [program, setExercise] = useState({
        "programId": 0,
        "name": "string",
        "category": "string",
        "programLevel": 0,
        "programWorkouts": [
            {
                "programId": 0,
                "workoutId": 0,
                "workout": {
                    "workoutId": 0,
                    "name": "string",
                    "type": "string"
                }
            }
        ]
    });
    useEffect(() => {
        //Gets a program by id
        ProgramAPI.GetProgramById(programId, token)
            .then(response => setExercise(response))
    }, [])
    const workoutList = program.programWorkouts.map((relation) =>
        <ListItem key={relation.workoutId}>
            <ListItemText
                primary={relation.workout.name}
                secondary={relation.workout.type}
            />
        </ListItem>
    );
    return (
        <>
            <h1>{program && program.name}</h1>
            <span>
                <h3>Program Level: </h3>
                <h3>{program.programLevel}</h3>
            </span>
            <h3>{program && 'Workouts'}</h3>
            <Container maxWidth='sm'>
                <List>
                    {workoutList}
                </List>
            </Container>
        </>
    );
}