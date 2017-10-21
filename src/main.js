// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueResource)
Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.emulateJSON = true
var PouchDB = require('pouchdb')
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    data: {
      back: false,
      db: new PouchDB('kodi', {auto_compaction: true})
    },
    router,
    render: h => h(require('./App'))
  })
})
