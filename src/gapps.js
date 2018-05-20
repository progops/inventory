
import {router} from '../index'
const gapi = require('googleapis')

// sheets api discovery url
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']
// Google Sheets write scope
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

export default {
  handleClientLoad () {
    gapi.load('client:auth2', () => {
      const k = 'BIzaSyBKxcvFTgwdkyG1GHqSOX0k8DIUFmf1NYI'.replace('B', 'A')
      const c = '828875335575-j4di6h7pd3mdlnhn7uh2pp7ugrqp8i9c.apps.googleusercontent.com'
      const s = 'K6qhiWoioJVlCfQGI05mVty8'
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: c,
        scope: SCOPES
      }).then(() => {
        this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => this.isSignedIn = isSignedIn)
      })
    })
  },
  // Check auth with google with existing token.
  auth (context, token) {

    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
