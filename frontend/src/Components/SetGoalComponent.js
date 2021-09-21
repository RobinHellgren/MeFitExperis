import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import SelectR from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from "react-redux"
import { GoalAPI } from './API/GoalAPI';
import { ProgramAPI } from './API/ProgramAPI';
import { useEffect } from "react";
import { WorkoutAPI } from './API/WorkoutAPI';
import { ExerciseAPI } from './API/ExerciseAPI';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectR: {
        width: 80,
        minWidth: 120,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default function SetGoalComponent() {
    const { token, profileId } = useSelector(state => state.sessionReducer);
    const classes = useStyles();

    const [programs, setPrograms] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);

    const [goal, setGoal] = useState({
        program: null,
        workouts: [],
        endDate: new Date(),
        startDate: new Date()
    })


    const [newWorkout, setNewWorkout] = useState({
        name: '',
        type: '',
        level: '',
        numberOfSets: []

    })

    const [exercisesToAdd, setExercisesToAdd] = useState({
        "exerciseRepititions": 1,
        "exerciseId": null,
        "workoutId": null
        });


    useEffect(() => {

        ProgramAPI.GetPrograms(token)
            .then(response => {
                setPrograms(response)
                console.log(programs)

            })
            .catch(e => {

            })

        WorkoutAPI.GetWorkouts(token)
            .then(response => {

                setWorkouts(response.map(w => ({ ...w, label: (w.type + ": " + w.name + " - Level: " + w.workoutLevel), value: w.workoutId })))

            })

            .catch(e => {

            })


        ExerciseAPI.GetExercises(token)
            .then(response => {

                setExercises(response.map(e => ({ ...e, label: (e.name + "  Target Muscle Group: " + e.targetMuscleGroup), value: e.exerciseId })))

            })

            .catch(e => {

            })

    }, []);





    const handleChange = (event) => {
        const name = event.target.name;
        setGoal({
            ...goal,
            [name]: event.target.value,
        });
    };

    const handleEDateChange = (date) => {
        setGoal({
            ...goal,
            endDate: date
        });
    };

    const handleSDateChange = (date) => {
        setGoal({
            ...goal,
            startDate: date
        });
    };

    const addWorkout = (workout) => {
        setGoal({
            ...goal,
            workouts: workout
        });
    }


    const handleNewWorkoutChange = (event) => {
        const name = event.target.name;
        setNewWorkout({
            ...newWorkout,
            [name]: event.target.value,
        });
    }


    const handleExerciseChange = (event) => {
        const name = event.target.name;
        setExercisesToAdd({
            ...exercisesToAdd,
            [name]: event.target.value,
        });
    }

    const addExerciseToWorkout = () => {
        setNewWorkout({
            ...newWorkout,
            numberOfSets: [...newWorkout.numberOfSets, exercisesToAdd],
        });
    }

    //TODO
    const createWorkout = (workout) => {
        console.log("createWorkout clicked")
        //create new workout and add to to workput list
        //TODO

        //adds the createded workout to the goal
        //addWorkout(newWorkout);
        //clear create nes workout field
    }

    const createGoal = () => {
        console.log("create goal")
        GoalAPI.PostGoal(goal, token, profileId);

    }


    return (
        <>
            <div>
                {programs && programs.length > 0 &&

                    < div >
                        <h1>Set Goal</h1>
                        <h2>Select Program: (optional)</h2>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                native
                                className={classes.selectEmpty}
                                defaultValue={""}
                                name="program"
                                onChange={handleChange}
                                inputProps={{ "aria-label": "program" }}
                            >
                                {programs.map((p) => <option value={p.programId}>{p.category}: {p.name} - Level: {p.programLevel}</option>)}

                            </Select>

                            <FormHelperText></FormHelperText>
                        </FormControl>


                        <h2>Add workouts:</h2>
                        <SelectR
                            defaultValue={[]}
                            isMulti
                            name="workouts"
                            options={workouts}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={addWorkout}
                        >

                        </SelectR>
                        {/*
                        <div
      style={{
        backgroundColor: 'rgb(240, 240, 240)'}}>

                        <h2>Create new workout</h2>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Workout name"
                            type="text"
                            id="name"
                            onChange={handleNewWorkoutChange}

                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="type"
                            label="Workout Type"
                            type="text"
                            id="type"
                            onChange={handleNewWorkoutChange}

                        />


                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="level"
                            label="Workout Level"
                            type="number"
                            min="0"
                            id="level"
                            onChange={handleNewWorkoutChange}

                        />

<h3>Selected exercises:</h3>
{newWorkout.numberOfSets.map((e) => <p>{e.exerciseRepititions}</p>)}
<div
      style={{
        backgroundColor: 'rgb(210, 210, 210)'}}>
            
                        <h5>Add exercise to workout:</h5>
                        <Select
                            native
                            className={classes.selectEmpty}
                            defaultValue={""}
                            name="exerciseId"
                            inputProps={{ "aria-label": "program" }}

                            onChange={handleExerciseChange}
                        >
                            {exercises.map((e) => <option value={e.exerciseId}>{e.name} - targetMuscleGroup: {e.targetMuscleGroup}</option>)}

                        </Select>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="exerciseRepititions"
                            label="Repetitions"
                            type="number"
                            min="0"
                            id="exerciseRepititions"
                            onChange={handleExerciseChange}

                        />

                     
                        <button onClick={addExerciseToWorkout}>Add exercise</button>
                        </div>
                        <br />
                        <button onClick={createWorkout}>Save and add workout to goal</button>
                        <br />
</div>
*/}
                        <h2>Select date:</h2>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>


                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="startDate"
                                label="Start Date"
                                value={goal.startDate}
                                onChange={handleSDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />


                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Endate"

                                value={goal.endDate}
                                onChange={handleEDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />



                        </MuiPickersUtilsProvider>


                        <br /><br />
                        <button onClick={createGoal}>Set Goal</button>

                    </div>
                }

            </div>

        </>
    );
}