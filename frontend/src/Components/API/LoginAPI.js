import keys from '../../keys';

export const LoginAPI = {

  //Posts the user's input to login in
  async Login(credentials) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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


    let response = await fetch(keys.REACT_APP_SERVER_URL + "/login", requestOptions)

    if (!response.ok) {
      const error = 'Login failed';
      throw new Error(error)
    }


    let token = await response.text();


    //Get profile of the user with the token
    var myHeaders2 = new Headers();
    myHeaders2.append("Authorization", "Bearer " + token);


    var requestOptions2 = {
      method: 'GET',
      headers: myHeaders2,
      redirect: 'follow'
    };

    let responsee = await fetch(keys.REACT_APP_SERVER_URL + "/login", requestOptions2);

    responsee = await responsee.json();


    return responsee;


  }
}