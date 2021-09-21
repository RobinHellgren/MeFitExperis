import React, { Component, useState } from 'react';
import { useHistory } from "react-router-dom";
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
import zIndex from '@material-ui/core/styles/zIndex';

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



export default function SetGoalComponent() {
    const { token, profileId } = useSelector(state => state.sessionReducer);
    const classes = useStyles();
    const history = useHistory();

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
        "exerciseId": null
    });

    const workouttype = [
        { value: "running", label: "Running" },
        { value: "walking", label: "Walking" },
        { value: "weighttraining", label: "Weight Training" },
        { value: "yoga", label: "Yoga" },
        { value: "mixes", label: "Mixed" },

    ]

    useEffect(() => {

        ProgramAPI.GetPrograms(token)
            .then(response => {
                setPrograms(response.map((p) => ({ ...p, value: p.programId, label: p.category + ":" + p.name + "- Level: " + p.programLevel })))

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





    const handleChange = (program) => {

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
    const createWorkout = () => {
        console.log("createWorkout clicked")
        WorkoutAPI.PostWorkout(token, newWorkout)
        //create new workout and add to to workput list
        //TODO

        //adds the createded workout to the goal
        //addWorkout(newWorkout);
        //clear create nes workout field
    }


   const removeExcercise = (e) => {

       var array = [...newWorkout.numberOfSets]; // make a separate copy of the array
       var index = array.indexOf(e);

       console.log(index);
      
       if (index !== -1) {
         array.splice(index, 1);

         setNewWorkout({
            ...newWorkout,
            numberOfSets: array,
        });
       }

    
   }

    const createGoal = () => {
        console.log("create goal")


        GoalAPI.PostGoal(goal, token, profileId)
            .then(response => {

                if (response.ok) {


                    alert("The new goal was successfully created!");
                    history.push("/goal");
                }
            });


    }

    function GetExercisesName(id){
        var result = exercises.find(obj => {
            return obj.exerciseId == id
          })

          console.log(result)
       
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
                        <h2>Select Program: (optional)</h2>

                        <SelectR
                        styles={customStyles}
                            isClearable="true"
                            name="program"
                            options={programs}
                            onChange={handleChange}
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

                        <div
                            style={{
                                backgroundColor: 'rgb(249, 249, 249)',
                            }}>

                            <h2>Create new workout</h2>
                            <TextField
                            style={{ zIndex: '0',
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
                             style={{ zIndex: '0',
                             backgroundColor: "white",
                             fontSize: 8  
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

                            <h3>Selected exercises:</h3>
                            {newWorkout.numberOfSets.map((e) =><div><p>{e.exerciseRepititions} repetions of {GetExercisesName(e.exerciseId)}<button onClick={() => removeExcercise(e)}>Remove</button></p></div>)}
                            <div
                                style={{
                                    backgroundColor: 'rgb(240, 240, 240)',
                                }}>

                                <h5>Add exercise to workout:</h5>
                                <Select
                                styles={customStyles}
                                    native
                                    className={classes.selectEmpty}
                                    defaultValue={""}
                                    name="exerciseId"
                                    inputProps={{ "aria-label": "program" }}

                                    onChange={handleExerciseChange}
                                >
                                    {exercises.map((e) => <option value={e.exerciseId}>{e.name}</option>)}

                                </Select>

                                <TextField
                                 style={{ zIndex: '0' }}
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