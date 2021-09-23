export const WorkoutAPI = {

    //Gets workouts from the DB
    //NOT WORKING, ARE NO ENDPOINT TO GET ALL WORKPUTS
    async GetWorkouts(token) {

        console.log("programapi get")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await  fetch("http://localhost/workouts", requestOptions);
        console.log(response)
        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    },


    async GetWorkout(token, id) {

   
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await  fetch("http://localhost/workouts/" + id, requestOptions);
  
        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    },

    async PostWorkout(token, workout) {
        console.log(workout)
   
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": workout.name,
            "type": workout.type,
            "workoutLevel": workout.level,
            "numberOfSets": workout.numberOfSets,
            "programWorkouts": []
          });
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        let response = await  fetch("http://localhost/workouts/", requestOptions);
  
        if (!response.ok) {
            const error = 'workout post failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    },


}