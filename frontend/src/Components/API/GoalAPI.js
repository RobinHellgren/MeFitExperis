import keys from '../../keys';

export const GoalAPI = {

    //Gets the user's uncompleted/active goal
    async GetGoal(token) {


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        let response = await fetch(keys.REACT_APP_SERVER_URL + "/goals", requestOptions);
        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response[0];

    },

    //Posts a goal that is connected to the user
    async PostGoal(newGoal, token, profileId) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "profileId": profileId,
            "startDate": newGoal.startDate,
            "endDate": newGoal.endDate,
            "completed": false,
            "programId": newGoal.program,
            "goalWorkouts": newGoal.workouts
        });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        let response = await fetch(keys.REACT_APP_SERVER_URL + "/goals", requestOptions);

        return response;

    },

    //Gets the user's completed goal
    async GetCompletedGoals(token) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        ;

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let result;
        await fetch(keys.REACT_APP_SERVER_URL + "/goals/completed", requestOptions)
        .then(response => result = response)
        .catch(error => console.log('error', error));
    
        return (await result.json());

    },

    //Updates a user's goal
    async UpdateGoal(goal, token) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "goalId": goal.goalId,
            "startDate": goal.startDate,
            "endDate": goal.endDate,
            "completed": goal.completed,
            "programId": goal.program,
            "profileId": goal.profileId,
            "goalWorkouts": goal.goalWorkouts
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(keys.REACT_APP_SERVER_URL + "/goals/" + goal.goalId, requestOptions)
        if (!response.ok) {
            const error = 'Post goal failed: ' + response.status;
            throw new Error(error)
        }

        response = (await response.text())

        return response;

    }

}


