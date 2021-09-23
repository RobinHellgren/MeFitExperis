import * as React from 'react'
import { useState, useEffect } from 'react';
import { ProgramAPI } from './API/ProgramAPI';
import { useSelector } from "react-redux"
import { Container, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

//The page showing the programs
export default function ProgramListPage() {
    const { token } = useSelector(state => state.sessionReducer);
    let [programs, setPrograms] = useState(
        [
            {
                "programId": 0,
                "name": "",
                "category": "",
                "programLevel": ""
            }
        ]
    );
    useEffect(() => {
        //Gets the programs
        ProgramAPI.GetPrograms(token)
            .then(response => setPrograms(response))
    }, [])
    const programList = programs.map((program) =>
        <ListItem>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link to={"/programs/" + program.programId} style={{ textDecoration: 'none', color: 'orange' }}>
                    <ListItemText
                        primary={program.name}
                        secondary={program.category}
                        about
                    />
                </Link>
            </Box>


        </ListItem>
    );
    return (
        <>
            <h1>Programs</h1>
            <Container maxWidth='sm'>
                <List>
                    {programList}
                </List>
            </Container>
        </>
    );
}