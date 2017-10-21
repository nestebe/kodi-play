      <template>
  <div class="layout-view">
    <div class="layout-padding">
      <div class="card">
        <div class="card-title">
  
          <div class="toolbar dark">
            <!-- Toolbar title -->
            <q-toolbar-title :padding="1">
              {{moviesDetails.title}}
            </q-toolbar-title>
            <button @click="openOnKodi(moviesDetails.file)">
              <i>airplay</i>
            </button>
          </div>
        </div>
        <div class="card-media">
          <img style="   height: auto;  margin: auto; width: auto; max-width: 300px;  max-height: 300px;" :src="getThumbnail(moviesDetails.thumbnail)">
  
        </div>
  
        <div class="card-content">
          {{moviesDetails.plot}}
          <hr>
  
          <span v-for="genre in moviesDetails.genre" class="chip label text-white bg-primary">
          {{genre}}
          </span>
          <hr>
          <div class="list item-delimiter">
            <q-collapsible icon="movie" label="Trailer">
              <q-video :src="getYoutubeLink(moviesDetails.trailer)" style="width: auto; height: auto"></q-video>
            </q-collapsible>
          </div>
        </div>
      </div>
    </div>
  </div>
  </q-layout>
</template>

<script>
import { Utils, LocalStorage, Loading } from 'quasar'
import KodiMovies from '../../kodi/movies.js'
import KodiRemote from '../../kodi/remote.js'
export default {
  data() {
    return {
      movies: [],
      kodiMovies: null,
      moviesDetails: { plot: '', thumbnail: '', title: '', genre: [], trailer: '', file:'' }
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
    getYoutubeLink(link) {
      console.log(link)
      if (link) {
        return 'https://www.youtube.com/embed/' + link.split("videoid=")[1] + '?controls=0&fs=1&rel=0&showinfo=0&color=white&iv_load_policy=3&modestbranding=1&color=white'

      } else {
        return ''
      }

    },
    openOnKodi(file) {

      var remote = new KodiRemote(this)
      remote.inputPlayFile(file).then(x => {
        console.log(x)
      })
    },
    getDetails(id) {
      Loading.show()
      var _self = this
      this.kodiMovies.getMovieDetails(parseInt(id)).then(details => {
        Loading.hide()
        console.log(details)
        _self.moviesDetails = details.result.moviedetails
      })
    }

  },
  beforeMount() {
    Loading.show()
    this.$root.back = true
    var _self = this
    _self.kodiMovies = new KodiMovies(this)
    console.log(this.$route.params.id)

    _self.getDetails(this.$route.params.id)

  },
  beforeDestroy() {

  },
    updated() {
console.log("updated")
  }
}
</script>

