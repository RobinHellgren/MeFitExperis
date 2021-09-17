export const ProgramAPI = {

    //Gets programs from the DB
    async GetPrograms(token) {

        console.log("programapi get")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await  fetch("http://localhost/programs", requestOptions);
        console.log(response)
        if (!response.ok) {
            const error = 'Goal fetch failed';
            throw new Error(response.status)
        }
        response = await response.json()

        return response;

    }
}