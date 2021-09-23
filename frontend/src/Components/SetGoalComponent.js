import React, { Component, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SelectR from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector } from "react-redux"
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
        backgroundColor: 'red'

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const customStyles = {

    option: (styles) => {
        return {
            ...styles,
            textAlign: 'left',
            zIndex: '99999'
        };
    }
}


//The component for setting a goal
export default function SetGoalComponent() {
    const { token, profileId } = useSelector(state => state.sessionReducer);
    const history = useHistory();

    const [programs, setPrograms] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [open, setOpen] = useState(false);

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
        "exerciseId": null
    });

    const workouttype = [
        { value: "Running", label: "Running" },
        { value: "Walking", label: "Walking" },
        { value: "Weighttraining", label: "Weight Training" },
        { value: "Yoga", label: "Yoga" },
        { value: "Mixed", label: "Mixed" },
        { value: "Stretching", label: "Stretching" },
    ]

    useEffect(() => {
        //Gets the program and set the program state
        ProgramAPI.GetPrograms(token)
            .then(response => {
                setPrograms(response.map((p) => ({ ...p, value: p.programId, label: p.category + ": " + p.name + "- Level: " + p.programLevel })))
            })
            .catch(e => {
            })
        //Gets the workouts and set the workout state
        WorkoutAPI.GetWorkouts(token)
            .then(response => {
                setWorkouts(response.map(w => ({ ...w, label: (w.type + ": " + w.name + " - Level: " + w.workoutLevel), value: w.workoutId })))
            })
            .catch(e => {
            })

        ////Gets the exercses and set the exercses state
        ExerciseAPI.GetExercises(token)
            .then(response => {
                setExercises(response.map(e => ({ ...e, label: (e.name + "  Target Muscle Group: " + e.targetMuscleGroup), value: e.exerciseId })))
            })
            .catch(e => {

            })

    }, []);


    //Updates the program in the goal state
    const handleProgramChange = (program) => {

        if (program) {
            setGoal({
                ...goal,
                program: program.programId,
            });
        } else {
            setGoal({
                ...goal,
                program: null,
            });
        }
    };
    //Updates the endate in the goal state
    const handleEDateChange = (date) => {
        setGoal({
            ...goal,
            endDate: date
        });
    };

    //Updates the startdate in the goal state
    const handleSDateChange = (date) => {
        setGoal({
            ...goal,
            startDate: date
        });
    };

    //Updates workouts in the goal state
    const addWorkout = (workout) => {
        setGoal({
            ...goal,
            workouts: workout
        });

    }

    //Updates the newworkout state
    const handleNewWorkoutChange = (event) => {
        const name = event.target.name;
        setNewWorkout({
            ...newWorkout,
            [name]: event.target.value,
        });
    }

    //Updated the type in newworkout state
    const handleNewWorkoutTypeChange = (type) => {
        if (type) {
            setNewWorkout({
                ...newWorkout,
                type: type.label
            });
        } else {
            setNewWorkout({
                ...newWorkout,
                type: null
            });

        }
    }

    //Updates the excercisesToAdd state
    const handleExerciseChange = (event) => {
        const name = event.target.name;
        setExercisesToAdd({
            ...exercisesToAdd,
            [name]: event.target.value,
        });
    }

    //Updates the excersises id in the excersiseToAdd state
    const handleExerciseEChange = (e) => {

        if (e) {
            setExercisesToAdd({
                ...exercisesToAdd,
                exerciseId: e.exerciseId
            });
        }

    }

    //Updates numberOfSets in the newWorkout state
    const addExerciseToWorkout = () => {
        setNewWorkout({
            ...newWorkout,
            numberOfSets: [...newWorkout.numberOfSets, exercisesToAdd],
        });
    }

    //Creates new workout, 
    const createWorkout = () => {
        //Posts the new workout to the DB
        WorkoutAPI.PostWorkout(token, newWorkout)
            .then(response => {
                response.label = (response.type + ": " + response.name + " - Level: " + response.workoutLevel)
                response.value = response.workoutId;
                //Adds the new workout to the workout state
                setWorkouts(workouts => [...workouts, response]);
                alert("The workout was succesfully created. You can now add the workout to the goal.")
                //Clears state
                setOpen(!open);
                setNewWorkout([]);
                setExercisesToAdd([]);
            });

    }


    //Removes a excerses from the newWorkout state
    const removeExcercise = (e) => {
        var array = [...newWorkout.numberOfSets];
        var index = array.indexOf(e);

        if (index !== -1) {
            array.splice(index, 1);

            setNewWorkout({
                ...newWorkout,
                numberOfSets: array,
            });
        }
    }
    //Creates a goal
    const createGoal = () => {
        //Posts the goal to the DB
        GoalAPI.PostGoal(goal, token, profileId)
            .then(response => {

                if (response.ok) {
                    alert("The new goal was successfully created!");
                    history.push("/goals");
                }
            });
    }

    //Gets a exercise's name
    function GetExercisesName(id) {
        var result = exercises.find(obj => {
            return obj.exerciseId == id
        })

        return result.name;
    }


    return (
        <>

            <div
                style={{
                    width: '40%',
                    margin: '0 auto'
                }}
            >
                {programs && programs.length > 0 &&

                    < div >
                        <h1>Set Goal</h1>
                        <h2>Select Program:</h2>

                        <SelectR
                            styles={customStyles}
                            isClearable="true"
                            name="program"
                            options={programs}
                            onChange={handleProgramChange}
                            placeholder="Select program..."

                        >

                        </SelectR>


                        <h2>Add workouts:</h2>
         
                            <SelectR
                                styles={customStyles}
                                defaultValue={[]}
                                isMulti
                                name="workouts"
                                options={workouts}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={addWorkout}
                                placeholder="Select workout(s)..."
                            >

                            </SelectR>
                            <br/>
                            <button onClick={() => setOpen(!open)}>Create new workout</button>

{open &&
<div>

                            <div
                                style={{
                                    backgroundColor: 'rgb(249, 249, 249)',
                                }}>

                                <h2>Create new workout</h2>
                                <TextField
                                    style={{
                                        zIndex: '0',
                                        backgroundColor: "white"
                                    }}
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


                                <SelectR
                                    styles={customStyles}
                                    isClearable="true"
                                    name="type"
                                    id="type"
                                    options={workouttype}
                                    placeholder="Select workout type..."
                                    onChange={handleNewWorkoutTypeChange}

                                >

                                </SelectR>

                                <TextField
                                    style={{
                                        zIndex: '0',
                                        backgroundColor: "white",
                                    }}
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


                                <div>

                                    <h5>Add exercise to workout:</h5>


                                    <SelectR
                                        styles={customStyles}
                                        isClearable="true"
                                        name="exercise"
                                        options={exercises}
                                        onChange={handleExerciseEChange}
                                        placeholder="Select exercise..."
                                    >

                                    </SelectR>


                                    <TextField
                                        style={{
                                            zIndex: '0',
                                            backgroundColor: "white",
                                            fontSize: 8,
                                            hegiht: 0
                                        }}
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
                            
                            <h3>Selected exercises:</h3>
                            {newWorkout.numberOfSets &&
                                <div>
                                    {newWorkout.numberOfSets.map((e) => <div><p className="small-text">{e.exerciseRepititions} repetions of {GetExercisesName(e.exerciseId)}<button className="small" onClick={() => removeExcercise(e)}>Remove</button></p></div>)}
                                </div>}
                            <br />
                            <button onClick={createWorkout}>Create workout</button>
                            <br />
                        </div>
                        </div>
                    }

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