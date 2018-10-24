const Instagram = require('./instagram');
const config = require('config')

// Params for your app

const login = config.get('Instagram.login')
const pass = config.get('Instagram.password')
const authUrl = config.get('Instagram.authUrl') 
const backUrl = config.get('Server.backUrl')
const port = config.get('Server.port')

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

