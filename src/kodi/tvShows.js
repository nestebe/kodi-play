import { LocalStorage, Loading } from 'quasar'
import KodiBase from './base'
class KodiTvShows extends KodiBase {

  async getTVShows () {
    Loading.show()
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetTVShows',
      'params': { 'limits': { 'start': 0, 'end': 9999 }, 'properties': ['title', 'genre', 'thumbnail'], 'sort': { 'order': 'ascending', 'method': 'label', 'ignorearticle': true } },
      'id': 'libMovies'
    }

    return await this.getRequest(data)
  }

  async getTVShowDetails (id) {
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetTVShowDetails',
      'params': { 'tvshowid': id, 'properties': ['title', 'genre', 'year', 'rating', 'episode', 'season', 'thumbnail', 'plot'] },
      'id': 'libShows'
    }

    return await this.getRequest(data)
  }

  async getSeasons (id) {
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetSeasons',
      'params': { 'tvshowid': id, 'properties': ['season', 'episode'] },
      'id': 'seasons'
    }
    return await this.getRequest(data)
  }

  async getEpisodes (tvshowid, idseason) {
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetEpisodes',
      'params': { 'tvshowid': tvshowid, 'season': idseason, 'properties': ['title', 'file', 'episode', 'season'], 'sort': { 'order': 'ascending', 'method': 'episode' } },
      'id': idseason
    }
    return await this.getRequest(data)
  }
}

export default KodiTvShows

