      <template>
    <div class="layout-view">
        <div class="layout-padding">
    
        </div>
    </div>
    </q-layout>
</template>

<script>
import { Utils, LocalStorage, Loading } from 'quasar'
import KodiMovies from '../../kodi/movies.js'
export default {
    data() {
        return {



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

        }

    },
    beforeMount() {

    },
    beforeDestroy() {

    }
}
</script>

