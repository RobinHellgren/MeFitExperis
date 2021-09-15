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
import { GoalAPI } from './GoalAPI';

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
    { value: '1', label: 'wo1' },
    { value: '2', label: 'wo2' },
    { value: '3', label: 'wo3' },
    { value: '4', label: 'wo4' },
    { value: '5', label: 'wo5' },
    { value: '6', label: 'wo6' }
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
    const { token } = useSelector(state => state.sessionReducer);
    const classes = useStyles();

    const [goal, setGoal] = useState({
        program: 'none',
        workouts: [],
        endDate: new Date(),
        startDate: new Date()
    })


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
             workouts: [...goal.workouts, workout[workout.length-1]]
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
        GoalAPI.PostGoal(goal, token);

    }


    return (
        <>
            <div
            style={{backgroundColor: 'orange'}}>
                <h1>Set Goal</h1>



                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        native
                        className={classes.selectEmpty}
                        defaultValue={""}
                        name="program"
                        onChange={handleChange}
                        inputProps={{ "aria-label": "program" }}
                    >
                        <option value="" disabled>
                            Program
                        </option>
                        <option value={1}>Program 1</option>
                        <option value={2}>Program 2</option>
                        <option value={3}>Program 3</option>
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>

                <h2>Add workouts</h2>
                <SelectR
                    defaultValue={[]}
                    isMulti
                    name="colors"
                    options={workouts}
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
        </>
    );
}