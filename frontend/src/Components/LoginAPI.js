import { keys } from '../keys';

export const LoginAPI = {
    login(credentials) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('Origin','http://localhost:3000');
        
        
        var raw = JSON.stringify({
          "username": credentials.username,
          "password": credentials.password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        return fetch("https://mefitapiserver.azurewebsites.net/login", requestOptions, {mode:'cors'})
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

    }
}