
<template>
  <div>
    <div class="layout-padding" style='
          margin: auto;
          width: 80%;
          padding-top: 50px;'>
  
      <div>
        <div class="row  large-gutter">
          <div class="">
            <button @click='remoteKodi.inputContextMenu()' class="circular light push"><i>list</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputUp()' class="circular dark push"><i>keyboard_arrow_up</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputInfo()' class="circular light push"><i>info</i></button>
          </div>
        </div>
        <div class="row  large-gutter">
          <div class="">
            <button @click='remoteKodi.inputLeft()' class="circular dark push"><i>keyboard_arrow_left</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputSelect()' class="circular light push"><i>done</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputRight()' class="circular dark push"><i>keyboard_arrow_right</i></button>
          </div>
        </div>
        <div class="row  large-gutter">
          <div class="">
            <button @click='remoteKodi.inputBack()' class="circular light push"><i>keyboard_return</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputDown()' class="circular dark push"><i>keyboard_arrow_down</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputHome()' class="circular light push"><i>home</i></button>
          </div>
        </div>
        <div class="row  medium-gutter ">
          <div  class="">
            <button @click='remoteKodi.inputSpeed(-8)' class="circular small light push"><i>fast_rewind</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputStop()' class="circular  small red push"><i>stop</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputPlay()' class="circular small  green push"><i>play_circle_outline</i></button>
          </div>
          <div class="">
            <button @click='remoteKodi.inputPause()' class="circular  small light push"><i>pause</i></button>
          </div>
          <div  class="">
            <button @click='remoteKodi.inputSpeed(8)' class="circular small light push"><i>fast_forward</i></button>
          </div>
        </div>
      </div>
 
    </div>
  
  </div>
  
  </div>
</template>

<script>


import { Utils } from 'quasar'
import RemoteKodi from '../kodi/remote'
export default {
  data() {
    return {
      remoteKodi: null,
      photo: '',
      volume:0

    }
  },

  methods: {

  },
  mounted() {
    this.remoteKodi = new RemoteKodi(this)


  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.move)
    document.removeEventListener('touchmove', this.move)
  }
}
</script>

