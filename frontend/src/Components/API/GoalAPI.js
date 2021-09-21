
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

        console.log(newGoal);

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
                const error = "Get completed goals failed";
                throw new Error(error);
            }
    
            return (await response.json());
    
        },

             //Gets the user's completed goal
             async UpdateGoal(goal, token){
               
                

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

                 let response= await fetch("http://localhost/goals/" + goal.goalId, requestOptions)
                 if (!response.ok) {
                    const error = 'Post goal failed: ' + response.status;
                    throw new Error(error)
                } 

                response =  (await response.text())
                console.log("updated goal: " + response)
        
                return response;
        
            }
    



}


