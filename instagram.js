const HeadlessChrome = require('simple-headless-chrome')
const express = require('express')
const app = express()

const browser = new HeadlessChrome({
    headless: true,
  })

  
class InstagramService {
    constructor(login, pass) {
        this.login = login;
        this.pass = pass;
        this.token = 'Token was not updated';
    }

    async getTokenFromUrl(url) {
        try {
          await browser.init()
      
          const mainTab = await browser.newTab({ privateTab: false })
      
          // Navigate to a URL
          await mainTab.goTo(url)
      
          // Fill an element
          await mainTab.fill('#id_username', this.login)
      
          // Type in an element
          await mainTab.fill('#id_password', this.pass)
      
          // Click on a button
          await mainTab.click('input[type="submit"]')
      
          // Log some info in your console
          await mainTab.log('Click login')

          await mainTab.wait(2000)
          
          // Close the browser
          await browser.close()

          return "Token was updated";
        } catch (err) {
          console.log('ERROR!', err)
        }
    }
    updateToken(authUrl) {
        return new Promise((resolve, reject) => {
            // Try to get token
            let status = this.getTokenFromUrl(authUrl)
            resolve(status)
        })
    }

    activateServer(backUrl, port) {
        app.get(backUrl, (req, res) => {
            // Save new token
            this.token = req.query.code;
            res.send('done')
        })
        app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
    }

    getToken() {
        return this.token;
    }
}

module.exports = InstagramService;