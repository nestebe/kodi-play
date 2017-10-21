      <template>
    <div class="layout-view">
        <div class="layout-padding">
    
            <div class="list highlight">
                <div class="list-label">Tv Shows</div>
                <div v-for="movie in tvShows" class="item" @click="getDetails(movie.tvshowid)">
    
                    <img  style="height: 100% !important;" class="item-primary thumbnail" :src=" getThumbnail(movie.thumbnail)">
                    <div class="item-content has-secondary">
                        <div>{{movie.label}}</div>
                    </div>
                    <i class="item-secondary"> live_tv</i>
                </div>
    
            </div>
        </div>
    </div>
    </q-layout>
</template>

<script>
import { Utils, LocalStorage, Loading } from 'quasar'
import KodiShows from '../../kodi/tvShows.js'
export default {
    data() {
        return {
            tvShows: []



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
        getDetails(id) {
            console.log(id)
                this.$router.push("Seasons/"+id)

        }

    },
    mounted() {
        this.$root.back = false
        var _self = this
        var kodiShows = new KodiShows(this)


        kodiShows.getTVShows().then(x => {
            console.log(x.result.tvshows)
            _self.tvShows = x.result.tvshows
        })

    },
     beforeMount() {
Loading.show()
    },
    beforeDestroy() {

    }
}
</script>

