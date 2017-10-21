import KodiBase from './base'
class KodiRemote extends KodiBase {

  /* async test () {
     var data = {
       'jsonrpc': '2.0',
       'method': 'JSONRPC.Introspect',
             // 'params': '[["volume","muted","version"]]',
       'id': 1
     }

         // console.log(this.vue)
     return this.vue.$http.jsonp('http://' + this.auth + this.ip + ':' + this.port + '/jsonrpc?request=' + encodeURIComponent(JSON.stringify(data))).then(function (data) {
       console.log(data.body)
       return data.body
     }, function (error) {
       console.log(error)
     })
   } */

  async inputHome () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Home',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputPlayFile (file) {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Player.Open',
      'params': { 'item': { 'file': file } },
      'id': 'inputPlay'
    }
    return await this.getRequest(data)
  }
  async inputPlay () {
    var data2 = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 'GetActivePlayers'
    }
    return await this.getRequest(data2).then(x => {
      var data = {
        'jsonrpc': '2.0',
        'method': 'Player.PlayPause',
        'params': { 'playerid': x.result[0].playerid },
        'id': 'inputPlay'
      }
      return this.getRequest(data)
    })
  }
  async inputPause () {
    var data2 = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 'GetActivePlayers'
    }

    return await this.getRequest(data2).then(x => {
      var data = {
        'jsonrpc': '2.0',
        'method': 'Player.PlayPause',
        'params': { 'playerid': x.result[0].playerid },
        'id': 'inputPlay'
      }
      return this.getRequest(data)
    })
  }
  async inputStop () {
    var data2 = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 'GetActivePlayers'
    }
    return await this.getRequest(data2).then(x => {
      var data = {
        'jsonrpc': '2.0',
        'method': 'Player.Stop',
        'params': { 'playerid': x.result[0].playerid },
        'id': 'inputPlay'
      }
      return this.getRequest(data)
    })
  }
  async inputNext () {
    var data2 = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 'GetActivePlayers'
    }
    return await this.getRequest(data2).then(x => {
      var data = {
        'jsonrpc': '2.0',
        'method': '"Player.GoTo',
        'params': { 'playerid': x.result[0].playerid, 'to': 'next' },
        'id': 'inputPlay'
      }
      return this.getRequest(data)
    })
  }
  async inputSpeed (speed) {
    var data2 = {
      'jsonrpc': '2.0',
      'method': 'Player.GetActivePlayers',
      'id': 'GetActivePlayers'
    }
    return await this.getRequest(data2).then(x => {
      var data = {
          'jsonrpc': '2.0',
          'method': 'Player.SetSpeed',
          'params': { 'playerid': x.result[0].playerid, 'speed': speed },
          'id': 'inputPlay'
        }
      return this.getRequest(data)
    })
  }
  async inputInfo () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Info',
      'id': 1
    }
    return await this.getRequest(data)
  }

  async inputLeft () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Left',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputRight () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Right',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputSelect () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Select',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputUp () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Up',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputDown () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Down',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputBack () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.Back',
      'id': 1
    }
    return await this.getRequest(data)
  }
  async inputContextMenu () {
    var data = {
      'jsonrpc': '2.0',
      'method': 'Input.ContextMenu',
      'id': 1
    }
    return await this.getRequest(data)
  }

}

export default KodiRemote

