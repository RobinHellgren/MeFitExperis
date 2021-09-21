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
        console.log(response)
        return response;

    },

    async getExerciseById(id, token){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        let requestOption = {
            method: 'GET',
            headers,
            redirect: 'follow'
        };
    
        let response = await fetch("http://localhost/exercises/" + id, requestOption);
    
        response = await response.json();
        console.log(response);
        return response;
    
    }
}