      <template>
    <div class="layout-view">
        <div class="layout-padding">
            <div v-if="tvShow" class="card">
                <div class="card-title">
    
                    <div class="toolbar dark">
                        <!-- Toolbar title -->
                        <q-toolbar-title :padding="1">
                            {{tvShow.title}}
                        </q-toolbar-title>
             
                    </div>
                </div>
                <div class="card-media">
                    <img style="   height: auto;  margin: auto; width: auto; max-width: 300px;  max-height: 300px;" :src="getThumbnail(tvShow.thumbnail)">
    
                </div>
    
                <div class="card-content">
                    {{tvShow.plot}}
                    <hr>
    
                    <span v-for="genre in tvShow.genre" class="chip label text-white bg-primary">{{genre}}</span>
                    <hr>
                    <div class="list item-delimiter">
                
                        <q-collapsible v-for="s in seasons" :key="s.seasonTitre" icon="live_tv" :label="s.seasonTitre">
    
                            <div v-for="episode in s.episodes" class="item">
    
                                <div class="item-content has-secondary">
                                    {{episode.label}}
                               
                                </div>
                             <i href='#' @click="openOnKodi(episode.file)" class="item-secondary">airplay</i> 
                            </div>
    
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
import KodiShows from '../../kodi/tvShows.js'
import KodiRemote from '../../kodi/remote.js'
export default {
    data() {
        return {
            tvShow: null,
            seasons: []




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


        },
       openOnKodi(file) {

       var remote =  new  KodiRemote(this)
       remote.inputPlayFile(file).then(x=>{
           console.log(x)
       })

        },
        getDetails(id) {

        }

    },
    updated() {
        console.log("updated", this.seasons)
    },
    beforeMount() {
        var _self = this
        _self.$root.back = true
  
        var details = new KodiShows(this)

        details.getTVShowDetails(parseInt(_self.$route.params.id)).then(x => {
            console.log(x)
            _self.tvShow = x.result.tvshowdetails
        })
        details.getSeasons(parseInt(_self.$route.params.id)).then(x => {


            console.log(x.result)
            if (x.result.seasons) {


                for (var i = 0; i < x.result.seasons.length; i++) {
                    var season = "Season " + x.result.seasons[i].season
                    details.getEpisodes(parseInt(_self.$route.params.id), x.result.seasons[i].season).then(y => {

                        console.log(y.result)

                        _self.seasons.push({ seasonTitre: "Season " + y.id, episodes: y.result.episodes })



                    })
                }
            }



        })
   



    },
    beforeDestroy() {

    }
}
</script>

