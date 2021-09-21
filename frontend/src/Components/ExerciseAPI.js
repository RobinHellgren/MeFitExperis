export function getExercise(id, token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let requestOption = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    let response = fetch("http://localhost:3000/exercises/" + id, requestOption)
        .then(response => response.json)
        .then(response => console.log(response));

    return response;

}