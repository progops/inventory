<script>
export default {
  name: 'google',
  render (createElement) {},
  created () {
    let tag = document.createElement('script')
    tag.setAttribute('src', 'https://apis.google.com/js/api.js')
    tag.onload = () => this.handleClientLoad()
    document.head.appendChild(tag)
  },
  methods: {
    handleClientLoad () {
      console.log('loaded')
      const gapi = window.gapi
      gapi.load('client:auth2', () => {
        // let isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        // console.log(`isSignedIn1=${isSignedIn}`)
        const k = 'BIzaSyBKxcvFTgwdkyG1GHqSOX0k8DIUFmf1NYI'.replace('B', 'A')
        const c = '828875335575-j4di6h7pd3mdlnhn7uh2pp7ugrqp8i9c.apps.googleusercontent.com'
        // const s = 'K6qhiWoioJVlCfQGI05mVty8'
        gapi.client.init({
          apiKey: k,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          clientId: c,
          scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
          console.log('initted')
          gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '19SPyNbHRgv2zEXDjQ7kejRVedcyrKXX7RoUywbl3B-o',
            range: 'Form Responses 1!A2:D'
          }).then((response) => {
            console.log(response)
          })
          // Listen for sign-in state changes.
          // gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => console.log(`isSignedIn=${isSignedIn}`))
        })
      })
    }
  }
}
</script>
