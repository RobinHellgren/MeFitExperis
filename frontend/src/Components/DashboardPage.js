import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ProgressBar from './ProgressBar';

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome</h2>

           <center> <Calendar /></center>

           <button>Set goals for the week</button>
           <ProgressBar />
           <p>Days left in the week to achieve their goals</p>
        </div>
    )
}