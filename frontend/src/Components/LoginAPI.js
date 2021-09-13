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
        const error = 'Login failed';
        throw new Error(error)
      }


      let token = await response.text();


//get profile

      var myHeaders2 = new Headers();
      myHeaders2.append("Authorization", "Bearer" + token);
      
      
      var requestOptions2 = {
        method: 'GET',
        headers: myHeaders2,
        redirect: 'follow'
      };
      
      let responsee = await fetch("https://mefitapiserver.azurewebsites.net/login?jwttoken=" + token, requestOptions2)
      
      responsee = await responsee.json();

      
    return responsee;
    

  }
}