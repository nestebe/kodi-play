import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/',
      component: load('Layout'),
      children: [
        { path: '', component: load('Telecommande') },
        { path: 'telecommande', component: load('Telecommande') },
        { name: 'setting', path: 'setting', component: load('settings/Setting') },
        { name: 'editDevice', path: 'editDevice/:id', component: load('settings/EditDevice') },
        // Movies
        { path: 'movies', component: load('movies/Movies') },
        { path: 'movieDetails/:id', component: load('movies/MovieDetails') },
        // TvShow
        { path: 'TvShows', component: load('tvShows/TvShows') },
        { path: 'Seasons/:id', component: load('tvShows/Seasons') },
        { path: 'EpisodeDetails/:id', component: load('tvShows/EpisodeDetails') }
      ]
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})
