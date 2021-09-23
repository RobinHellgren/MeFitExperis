import React from 'react';
import { LinearProgress } from '@material-ui/core';

//NOT USED
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