import KodiBase from './base'

class KodiMovies extends KodiBase {

  async getMovies () {
    console.log('test')
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetMovies',
      'params': { 'limits': { 'start': 0, 'end': 9999 }, 'properties': ['rating', 'thumbnail', 'playcount', 'file', 'year', 'genre', 'plot', 'runtime'], 'sort': { 'order': 'ascending', 'method': 'label', 'ignorearticle': true } },
      'id': 'libMovies'
    }
    return await this.getRequest(data)
  }

  async getMovieDetails (movieId) {
    var data = {
      'jsonrpc': '2.0',
      'method': 'VideoLibrary.GetMovieDetails',
      'params': { 'movieid': movieId, 'properties': ['title', 'genre', 'rating', 'trailer', 'thumbnail', 'file', 'tag', 'plot'] },
      'id': 'libMovies2'
    }
    return await this.getRequest(data)
  }

}

export default KodiMovies

