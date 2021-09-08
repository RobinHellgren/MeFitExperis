import { keys } from '../keys';

export const LoginAPI = {
    login(credentials) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "username": credentials.username,
          "password": credentials.password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };
        
        return fetch("https://mefitapiserver.azurewebsites.net/login", requestOptions)
        .then(async response => {
          if (!response.ok) {
              const { error = 'An unknown error occurred' } = await response.json()
              throw new Error(error)
          }
          return response.json()
      })


    }
}