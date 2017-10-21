
<template>
  <div>
    <div class="layout-padding">
  
      <div class="list highlight">
        <div class="list-label">Movies</div>
        <div v-for="movie in movies" class="item" @click="getDetails(movie.movieid)">
  
          <img style="height: 100% !important;" class="item-primary thumbnail" :src=" getThumbnail(movie.thumbnail)">
          <div class="item-content has-secondary">
            <div>{{movie.label}}</div>
    
          </div>
          <i class="item-secondary"> movie</i>
        </div>
  
      </div>

  
    </div>
  </div>
</template>

<script>


import { Utils, LocalStorage, Loading } from 'quasar'
import KodiMovies from '../../kodi/movies.js'
export default {
  data() {
    return {
      movies: [],
      kodiMovies: null
    }
  },

  methods: {
    getThumbnail(link) {
      var d = link //x.result.movies[0].thumbnail
      d = d.replace("image://", "");
      var d2 = decodeURIComponent(d);
      console.log(d2)
      var foo = d2.substring(0, d2.length - 1);
      return foo
    },
 
    getDetails(id) {
    this.$router.push("movieDetails/"+id)


    },


  },
  mounted() {
  //  Loading.show()
    this.$root.back = false
    var _self = this
    _self.kodiMovies = new KodiMovies(this)

    _self.kodiMovies.getMovies().then(mov => {
      console.log(mov)
      _self.movies = mov.result.movies
     // Loading.hide()
    })

  },
  beforeDestroy() {

  }
}
</script>

