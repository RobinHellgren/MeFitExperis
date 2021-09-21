export const ExerciseAPI = {

    //Gets exercises from the DB
    async GetExercises(token) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await  fetch("http://localhost​/exercises", requestOptions);
        if (!response.ok) {
            const error = 'Exercises fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    }
}