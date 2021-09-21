export async function getExercise(id, token){
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