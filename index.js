const Instagram = require('./instagram');

// Params for your app

const login = ''
const pass = ''
const authUrl = '' // example: https://api.instagram.com/oauth/authorize/?client_id=YOUR_APP_CODE&redirect_uri=http://localhost:5000/back/&response_type=code
const backUrl = '' // example: /back/
const port = 5000

// end params

// Create new object of class
let instagram = new Instagram(login, pass);
// Activate server to get responce from instagram.com
instagram.activateServer(backUrl, port);

// async func for update and get token
async function updateToken() {
  await instagram.updateToken(authUrl)
  let token = instagram.getToken();
  console.log("Token: " + token) // it's your token
}

updateToken();

