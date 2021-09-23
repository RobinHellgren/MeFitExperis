import keys from '../../keys';

export const ExerciseAPI = {

    //Gets all exercises from the DB
    async GetExercises(token) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch(keys.REACT_APP_SERVER_URL + "/exercises", requestOptions);
        if (!response.ok) {
            const error = 'Exercises fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()
        return response;

    },

    //Gets a exercise by id from the DB
    async getExerciseById(id, token) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        let requestOption = {
            method: 'GET',
            headers,
            redirect: 'follow'
        };

        let response = await fetch(keys.REACT_APP_SERVER_URL + "/exercises/" + id, requestOption);

        response = await response.json();
        return response;

    }
}