
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


        let response = await fetch("http://localhost/goals", requestOptions);
        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(error)
        }
        response = await response.json()
        console.log("get goal resp:" + response)
        return response[0];

    },

    //Posts a goal that is connected to the user
    async PostGoal(newGoal, token, profileId) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        console.log(newGoal.workouts);

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


        let response = await fetch("http://localhost/goals", requestOptions);
        if (!response.ok) {
            const error = 'Post goal failed';
            throw new Error(error)
        }
        response = await response.json()
        console.log("resp:" + response)
        return response[0];

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
              
             let response= await fetch("http://localhost/goals/completed", requestOptions)
             if (!response.ok) {
                const error = 'Post goal failed';
                throw new Error(error)
            }
    
            return (await response.json());
    
        },

             //Gets the user's completed goal
             async UpdateGoal(token, goalId){

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");
    ;
        
                var requestOptions = {
                    method: 'PATCH',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                  
                 let response= await fetch("http://localhost/goals/" + goalId, requestOptions)
                 if (!response.ok) {
                    const error = 'Post goal failed';
                    throw new Error(error)
                }
        
                return (await response.json());
        
            }
    



}


