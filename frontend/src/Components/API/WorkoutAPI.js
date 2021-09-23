export const WorkoutAPI = {

    //Gets workouts from the DB
    async GetWorkouts(token) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch("http://localhost/workouts", requestOptions);

        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    },

    //Gets a workout by id from DB
    async GetWorkout(token, id) {


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch("http://localhost/workouts/" + id, requestOptions);

        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()
        console.log(response);
        return response;

    },

    //Posts a workout to the DB
    async PostWorkout(token, workout) {

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

        let response = await fetch("http://localhost/workouts/", requestOptions);

        if (!response.ok) {
            const error = 'Workout post failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    },


}