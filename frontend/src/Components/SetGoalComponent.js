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

const workouts = [
    { label: 'a', workoutId: '1', complete: 'false' }
]

const exercises = [
    { value: '1', label: 'exercises1' },
    { value: '2', label: 'exercises2' },
    { value: '3', label: 'exercises3' },
    { value: '1', label: 'exercises4' },
    { value: '2', label: 'exercises5' },
    { value: '3', label: 'exercises6' }
]


export default function SetGoalComponent() {
    const { token, profileId } = useSelector(state => state.sessionReducer);
    const classes = useStyles();

    const [programs, setPrograms] = useState([]);

    const [goal, setGoal] = useState({
        program: null,
        workouts: [],
        endDate: new Date(),
        startDate: new Date()
    })


    const [newWorkout, setNewWorkout] = useState({
        name: 'none',
        type: '',
        numerofsets: ''
    })

    
    useEffect(() => {

        ProgramAPI.GetPrograms(token)
            .then(response => {
                setPrograms(response)
                console.log(programs)

            })
            .catch(e => {

            })

    }, []);


    /* let optionRender;
     if (programs.lenght != 0) {
         console.log("map")
 
         
         optionRender = programs.map(p => <option value={p.programId}>{p.name}</option>)
                     
                
           }*/




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
            workouts: [...goal.workouts, workout[workout.length - 1]]
        });
    }

    //TODO
    const createWorkout = (workout,) => {
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
                            name="colors"
                            options={workouts}
                            label="ex"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={addWorkout}
                        />

                        <h2>Create new workout</h2>
                        <SelectR
                            defaultValue={[]}
                            isMulti
                            name="colors"
                            options={exercises}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        <button onClick={createWorkout}>Save and add workout</button>
                        <br />

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