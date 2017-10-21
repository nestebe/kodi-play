import { LocalStorage, Toast, Loading } from 'quasar'
class KodiBase {

  constructor (vue) {
    this.vue = vue
    var value = LocalStorage.get.item('config')
    console.log(value)
    if (value) {
      this.ip = value.ip
      this.password = value.password
      this.port = value.port
      this.user = value.user
      this.auth = ''
    }
    if (this.user && this.password) {
      this.auth = this.user + ':' + this.password + '@'
    }
    if (!value) {
      console.log('No device configured !', value)
      Loading.hide()
      Toast.create({
        html: 'No device configured',
        icon: 'warning',
        timeout: 6000,
        button: {
          label: 'Configure',
          handler () {
            vue.$router.push('Setting')
          },
          color: '#428BCA'
        }
      })
    }
    console.log('constructor')
  }

  async test () {
    console.log('test')
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetMovies',
      params: { 'limits': { 'start': 0, 'end': 9999 }, 'properties': ['rating', 'thumbnail', 'playcount', 'file', 'year', 'genre', 'plot', 'runtime'], 'sort': { 'order': 'ascending', 'method': 'label', 'ignorearticle': true } },
      'id': 'libMovies'
    }

    return this.vue.$http.jsonp('http://' + this.auth + this.ip + ':' + this.port + '/jsonrpc?request=' + encodeURIComponent(JSON.stringify(data))).then(function (data) {
      console.log(data.body)
      return data.body
    }, function (error) {
      console.log(error)
    })
  }

  async getRequest (args) {
    return this.vue.$http.jsonp('http://' + this.auth + this.ip + ':' + this.port + '/jsonrpc?request=' + encodeURIComponent(JSON.stringify(args), {

      // use before callback
      before (request) {
        // abort previous request, if exists

        console.log('before rq', request)
        if (this.previousRequest) {
          console.log('previous request exist')
          this.previousRequest.abort()
        }

        // set previous request on Vue instance
        this.previousRequest = request
      }

    })).then(function (data) {
      // console.log(data)
      Loading.hide()
      if (!data.ok) {
        Toast.create({
          html: 'Connexion error',
          icon: 'warning',
          timeout: 3000
        })
      }
      return data.body
    }, function (error) {
      Loading.hide()
      Toast.create({
        html: 'Connexion error',
        icon: 'warning',
        timeout: 3000
      })
      console.log(error)
    })
  }

  async getActivePlayers () {
    console.log('getActivePlayers')
    var data = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 1
    }
    return this.vue.$http.jsonp('http://' + this.auth + this.ip + ':' + this.port + '/jsonrpc?request=' + encodeURIComponent(JSON.stringify(data))).then(function (data) {
      console.log(data.body)
      return data.body
    }, function (error) {
      console.log(error)
    })
  }

}

export default KodiBase

