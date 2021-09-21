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


    let response = await fetch("http://localhost/login", requestOptions);
    if (!response.ok) {
        const error = 'Goal fetch failed';
        throw new Error(error)
    }
    response = await response.json()
    console.log("resp:" + response)
    return response;



},
    async updateProfile(token, newFirstName, newLastName, newEmail, newWeight, newHeight, newMedicalConditions, newDisabilities, newFitnessEvaluation, userId){
        var updateProfileHeader = new Headers();


        updateProfileHeader.append("Content-Type", "application/json");
        updateProfileHeader.append("Authorization", "Bearer " + token);
        var raw = JSON.stringify({
            "FirstName": newFirstName,
            "LastName": newLastName,
            "Email": newEmail,
            "Weight": newWeight,
            "Height": newHeight,
            "MedicalConditions": newMedicalConditions,
            "Disabilities": newDisabilities,
            "FitnessEvaluation": newFitnessEvaluation
        });
        console.log(raw);
        console.log(updateProfileHeader);
        var requestOptions2 = {
           method: "PATCH",
           headers: updateProfileHeader,
           body: raw,
        redirect: "follow"
        };
        console.log(requestOptions2);
        let updateresponse = await fetch("http://localhost/user/"+userId, requestOptions2);

        updateresponse = await updateresponse.json()
        console.log("resp:" + updateresponse)
        return updateresponse;
    }
}

