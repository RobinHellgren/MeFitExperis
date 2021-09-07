import { keys } from '../keys';

export const LoginAPI = {
    login(credentials) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("password", credentials.password);
        urlencoded.append("username", credentials.username);
        urlencoded.append("client_id", "mefit");
        urlencoded.append("grant_type", "password");
        urlencoded.append("client_secret", "7e4c0630-078a-4868-a9a3-df978ce6db0e");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
         
        //key.REACT_APP_SERVER_URL + /login
        return fetch("https://mefitkeycloak.azurewebsites.net/auth/realms/MeFit/protocol/openid-connect/token", requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const { error = 'Unknown error' } = await response.json()
                    console.log(response)
                    throw new Error(error)
                }
                return response.json()

            })

    }
}