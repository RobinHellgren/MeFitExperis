export const RegisterAPI = {

    register(user) {

        console.log("rgiser api");


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "firstname": user.firstName,
            "lastname": user.lastName,
            "email": user.email,
            "username": user.username,
            "password": user.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("https://mefitapiserver.azurewebsites.net/user", requestOptions).then(function (response) {
            if (response.status == 400) {
                const error = "User already exsits";
                throw new Error(error)
            } else if (response.ok) {
                return { username: user.username, password: user.password }

            } else {
                const error = "Unknown error";
                throw new Error(error)
            }

        })

    }
}
