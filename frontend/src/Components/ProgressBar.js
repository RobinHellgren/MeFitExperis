// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
import React from 'react';
import { LinearProgress } from '@material-ui/core';

const normalise = value => (70);

export default function ProgressBar(props) {
  return (
      <div>
      <p>Progress towards the goals: </p>
    <React.Fragment>
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>

    </div>
  )
}