export const ProfileAPI = {

    //Gets the profile from the Db
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
        return response;



    },
    async updateProfile(token, newFirstName, newLastName, newEmail, newWeight, newHeight, newMedicalConditions, newDisabilities, newFitnessEvaluation, userId) {
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

        var requestOptions2 = {
            method: "PATCH",
            headers: updateProfileHeader,
            body: raw,
            redirect: "follow"
        };
        let updateresponse = await fetch("http://localhost/user/" + userId, requestOptions2);

        updateresponse = await updateresponse.json()

        return updateresponse;
    }
}

