import { keys } from '../keys';

export const LoginAPI = {
  async login(credentials) {

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

    let response = await fetch("https://mefitapiserver.azurewebsites.net/login", requestOptions)

      if (!response.ok) {
        const error = 'An unknown error occurred';
        throw new Error(error)
      }
  
    return response.text();
    

  }
}