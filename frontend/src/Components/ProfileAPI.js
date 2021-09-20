import { ContactSupportOutlined } from '@material-ui/icons';
import React from 'react';
// Gets the current users active goals 


export const ProfileAPI = {
    
    async GetProfile(token) {
    

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    var requestOptions = {
        method: 'GET',
       headers: myHeaders,
        redirect: 'follow'
    };
    console.log(myHeaders);
    
    let response = await fetch("http://localhost/login", requestOptions);
    if (!response.ok) {
        const error = 'Goal fetch failed';
        throw new Error(error)
    }
    response = await response.json()
    console.log("resp:" + response)
    return response;



},
    async updateProfile(token/*, newFirstName/*, newLastName, newEmail, newWeight, newHeight, newMedicalConditions, newDisabilities, newFitnessEvaluation*/){
        var updateProfileHeader = new Headers();

        updateProfileHeader.append("Origin", "http://localhost:3000");
        updateProfileHeader.append("Content-Type", "application/json");
        updateProfileHeader.append("Authorization", "Bearer " + token);
        var raw = JSON.stringify({
            "firstName": "fiskarnaasdasd"/*,
            lastName: newLastName,
            email: newEmail,
            weight: newWeight,
            height: newHeight,
            medicalConditions: newMedicalConditions,
            disabilites: newDisabilities,
            fitnessEvaluation: newFitnessEvaluation*/
        });
        console.log(raw);
        console.log(updateProfileHeader);
        var requestOptions2 = {
           method: "PATCH",
           headers: {
            'origin': 'http://localhost:3000',
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization': 'bearer ' + token
           },
           body: raw,
        redirect: "follow"
        };
        console.log(requestOptions2);
        let updateresponse = await fetch("http://localhost/user/:user_id", requestOptions2);
        
        
        return await updateresponse.text();
    }
}


