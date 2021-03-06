import { Box, Container, List, ListSubheader, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import * as React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { WorkoutAPI } from './API/WorkoutAPI';

//The page for the workouts
export default function WorkoutListPage() {
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
        //Gets the wotkouts
        WorkoutAPI.GetWorkouts(token)
            .then(response => setWorkouts(response))
    }, [])
    const workoutList = workouts.map((workout) =>
        <ListItem>
            <Container maxWidth='sm'>


                <Box p={2} sx={{ alignItems: 'center', backgroundColor: '#485266', borderRadius: '12px', }}>
                    <Link to={"/workouts/" + workout.workoutId} style={{ textDecoration: 'none' }}>
                        <ListItemText
                            primary={workout.name}
                            secondary={workout.type}
                            style={{ marginLeft: '10px', color: 'orange', fontWeight: 'bold',  fontSize: '200'}}
                        />
                    </Link>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius: '12px' }}>
                        <List
                            bgcolor={'background.paper'}
                            sx={{ width: '100%', maxWidth: 360 }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    <b>Exercises</b>
                                </ListSubheader>
                            }

                        >
                            {workout.workoutSets.map((set) =>
                                <>
                                    <Divider />
                                    <ListItem>
                                        <Link to={"/exercises/" + set.exercise.exerciseId} style={{ color: 'orange', textDecoration: 'none' }}>
                                            <ListItemText
                                                primary={set.exercise.name}
                                                secondary={set.exerciseRepititions}
                                            />
                                        </Link>
                                    </ListItem>
                                    <Divider />
                                </>
                            )}
                        </List>
                    </Box>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius: '12px', mt: 3 }}>
                        <List sx={{ width: '100%', maxWidth: 360 }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Programs
                                </ListSubheader>
                            }>
                            {workout.programWorkouts.map((program) =>
                                <>
                                    <Divider />
                                    <ListItem>
                                        <Link to={"/programs/" + program.programId} style={{ color: 'orange', textDecoration: 'none'}}>
                                            <ListItemText
                                                primary={program.name}
                                            />
                                        </Link>
                                    </ListItem>
                                    <Divider />
                                </>
                            )}
                        </List>
                    </Box>
                </Box>
            </Container>
        </ListItem>
    );
    return (
        <>
            <h1>Workouts</h1>
            <Button onClick={console.log(workouts)}></Button>
            <List>
                {workoutList}
            </List>
        </>
    );
}