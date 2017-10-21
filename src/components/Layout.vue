<template>
  <q-layout>
    <div slot="header" class="toolbar dark">
      <button v-if='!$root.back' class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <button v-else  @click="$router.back()">
        <i>keyboard_arrow_left</i>
      </button>
      <q-toolbar-title :padding="1">
        Kodi Media Remote
      </q-toolbar-title>

    </div>




    <q-drawer ref="leftDrawer">
  

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="settings_remote" to="/Telecommande" >
          Remote Control
        </q-drawer-link>

        <q-drawer-link icon="movie" to="/movies">
          Movies
        </q-drawer-link>
        <q-drawer-link icon="tv" to="/TvShows">
          Tv Shows
        </q-drawer-link>
         <hr>
        <q-drawer-link icon="settings" to="/setting">
          Settings
        </q-drawer-link>
      </div>
    </q-drawer>

    <router-view class="layout-view"></router-view>

    <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Right-side Drawer
        </q-toolbar-title>
      </div>

      <p style="padding: 25px;" class="text-grey-7">
        This is yet another Drawer that does not gets displayed alongside content on
        bigger screens.
      </p>
    </q-drawer>

 
 
  
  </q-layout>
</template>

<script>
//import advertise from './modules/advertise.vue'
export default {
 /*   components: {
    advertise
  },*/
  data () {
    return {
      search: '',
      back:true
    }
  }
}
</script>