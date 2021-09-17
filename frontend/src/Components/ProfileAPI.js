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

}

}


