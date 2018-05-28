<script>
const sheetId = '19SPyNbHRgv2zEXDjQ7kejRVedcyrKXX7RoUywbl3B-o'

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
        const k = 'BIzaSyBKxcvFTgwdkyG1GHqSOX0k8DIUFmf1NYI'.replace('B', 'A')
        const c = '828875335575-j4di6h7pd3mdlnhn7uh2pp7ugrqp8i9c.apps.googleusercontent.com'
        gapi.client.init({
          apiKey: k,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          clientId: c,
          scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
          console.log('initted')
          this.gapi = gapi
        })
      })
    },
    checkClientReady () {
      if (!this.gapi) {
        alert('Not connected to Google! Can\'t do anything right now')
        return false
      }
      return true
    },
    lookupStaff (barcode) {
      if (!this.checkClientReady()) return // TODO need a empty promise
      return this.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Staff List!A1:B100'
      }).then((response) => {
        console.log(response)
        var row = response.result.values.find((row) => row[1] === barcode)
        console.log(row)
        if (row) {
          return {name: row[0]}
        }
        return undefined
      })
    },
    addToSheet (barcode, name, position, inOrOut) {
      if (!this.checkClientReady()) return
      console.log('addToSheet')
      return this.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Form Responses',
        // valueOptions: ???,
        resource: {
          values: [ new Date(), name, barcode, inOrOut, position ]
        }
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
